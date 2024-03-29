import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import * as DataTableService from '../data-table/data-table.service';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../shared/interfaces';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [DataTableService.DataTableService],
})
export class UserComponent implements OnInit, OnDestroy {
  isChanging: boolean = false;
  pwError: string;
  loadedUser: User;
  notFound: boolean = false;
  myGroup: FormGroup;
  emailExists: boolean = false;

  searchMode: boolean = true;
  newMode: boolean = false;
  editMode: boolean = false;

  getItemSub: Subscription;
  sortSub: Subscription;
  sortedUserData: User[] = [];
  lastSort: Sort;

  userDataChangedSub: Subscription;
  userData: User[] = [];

  rowSelectSubscription: Subscription;

  userHeaders = [
    { name: 'user_id', szoveg: 'Felhasználó ID' },
    { name: 'name', szoveg: 'Név' },
    { name: 'birth_date', szoveg: 'Születési dátum' },
    { name: 'email', szoveg: 'Email' },
    { name: 'post', szoveg: 'Besorolás' },
  ];

  constructor(
    private userService: UserService,
    private dtTblService: DataTableService.DataTableService,
    private dataStorageService: DataStorageService
  ) {
    this.sortedUserData = userService.getUsers();
  }

  ngOnInit(): void {
    this.userDataChangedSub = this.userService.userDataChanged.subscribe(
      (userData: User[]) => {
        this.userData = userData;
        this.sortedUserData = this.userData.slice();
        if (!!this.lastSort) {
          this.sortData(this.lastSort);
        } else {
          this.dtTblService.emitDataChanged(this.sortedUserData.slice());
        }
      }
    );
    this.dataStorageService.fetchUsers();

    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      this.dtTblService.emitDataChanged(this.sortedUserData.slice());
    });

    this.dtTblService.emitDataChanged(this.sortedUserData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();

    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: User) => {
        this.myGroup = new FormGroup({
          user_id: new FormControl(data.user_id, Validators.required),
        });
        this.onSearchUser();
      }
    );
  }

  initForm() {
    this.myGroup = new FormGroup({
      user_id: new FormControl('', Validators.required),
      name: new FormControl(
        { value: '', disabled: this.searchMode ? true : false },
        Validators.required
      ),
      birth_date: new FormControl(
        { value: '', disabled: this.searchMode ? true : false },
        Validators.required
      ),
      email: new FormControl(
        { value: '', disabled: this.searchMode ? true : false },
        [Validators.required, Validators.email]
      ),
      post: new FormControl(
        { value: '', disabled: this.searchMode ? true : false },
        Validators.required
      ),
    });
  }

  returnToSearchMode() {
    this.clearForm();
    this.searchMode = true;
    this.newMode = false;
    this.editMode = false;
  }

  onChangeToNewMode() {
    this.clearForm();
    this.newMode = true;
    this.searchMode = false;
    this.editMode = false;
    this.myGroup.enable();
    this.myGroup.get('user_id').disable();
  }

  onSearchUser() {
    this.loadedUser = this.userService.getUser(
      this.myGroup.getRawValue().user_id
    );
    if (this.loadedUser) {
      //lekérem a beirt azonosito szerinti felhasználót
      let tempDate = new Date(
        this.loadedUser.birth_date.getTime() -
          this.loadedUser.birth_date.getTimezoneOffset() * 60000
      );
      tempDate = new Date(tempDate.setDate(tempDate.getDate()));
      console.log('new date: ' + tempDate.toISOString());

      this.editMode = true;
      this.newMode = false;
      this.searchMode = false;

      this.myGroup = new FormGroup({
        user_id: new FormControl(this.loadedUser.user_id, Validators.required),
        name: new FormControl(this.loadedUser.name, Validators.required),
        birth_date: new FormControl(
          tempDate.toISOString().split('T')[0],
          Validators.required
        ),
        email: new FormControl(this.loadedUser.email, Validators.required),
        post: new FormControl(this.loadedUser.post, Validators.required),
      });
      this.myGroup.get('user_id').disable();
    } else {
      this.clearForm();
      this.notFound = true;
      this.searchMode = true;
      this.editMode = false;
      this.newMode = false;
    }
  }

  onDelete() {
    this.dataStorageService.deleteUser(
      Number(this.myGroup.getRawValue().user_id)
    );
    this.userDataChanged();
    this.clearForm();
    this.searchMode = true;
    this.loadedUser = null;
  }

  onSubmit() {
    console.log(new Date(this.myGroup.getRawValue().birth_date));

    this.checkEmailExistance();
    if (!this.emailExists) {
      this.dataStorageService
        .newUser({
          name: this.myGroup.getRawValue().name,
          birth_date: new Date(this.myGroup.getRawValue().birth_date),
          email: this.myGroup.getRawValue().email,
          post: this.myGroup.getRawValue().post,
        })
        .subscribe();
      this.userDataChanged();
    }
    this.clearForm();
    this.newMode = false;
    this.searchMode = true;
  }

  onUpdateUser() {
    let userToUpdate: User = {
      user_id: Number(this.myGroup.getRawValue().user_id),
      name: this.myGroup.getRawValue().name,
      birth_date: new Date(this.myGroup.getRawValue().birth_date),
      email: this.myGroup.getRawValue().email,
      post: this.myGroup.getRawValue().post,
    };
    this.dataStorageService.updateUser(userToUpdate);

    this.clearForm();
    this.searchMode = true;
  }

  checkEmailExistance() {
    this.userData.forEach((user) => {
      if (user.email == this.myGroup.getRawValue().email) {
        this.emailExists = true;
      } else {
        this.emailExists = false;
      }
    });
  }

  clearForm() {
    this.searchMode = true;
    this.editMode = false;
    this.newMode = false;

    this.initForm();
    this.notFound = false;
    this.emailExists = false;
    this.loadedUser = null;
  }

  userDataChanged() {
    this.sortedUserData = this.userService.getUsers();
    this.dtTblService.emitDataChanged(this.sortedUserData.slice());
  }

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.rowSelectSubscription.unsubscribe();
    this.userDataChangedSub.unsubscribe();
  }

  initPwChg() {
    this.isChanging = true;
  }

  onClosePwChg() {
    this.isChanging = false;
  }

  onSavePwChg(pw) {
    this.dataStorageService
      .changePwByAdmin(this.loadedUser.email, pw)
      .subscribe(
        () => {
          this.isChanging = false;
        },
        (error) => {
          this.pwError = '' + error.error;
        }
      );
  }

  resetPw() {
    this.dataStorageService
      .changePwByAdmin(this.myGroup.value.email, 'changeme')
      .subscribe(() => {
        console.log('in sub');
      });
    this.clearForm();
  }

  sortData(sort: Sort) {
    this.lastSort = sort;
    const data = this.userService.getUsers();
    if (!sort.active || sort.direction === '') {
      this.sortedUserData = data;
      this.dtTblService.emitDataChanged(this.sortedUserData.slice());
      return;
    }

    this.sortedUserData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'user_id':
          return this.compare(a.user_id, b.user_id, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'birth_date':
          return 0;
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'post':
          return this.compare(a.post, b.post, isAsc);

        default:
          return 0;
      }
    });

    this.sortedUserData = data.slice();
    this.dtTblService.emitDataChanged(this.sortedUserData.slice());
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
