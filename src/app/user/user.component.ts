import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import * as DataTableService from '../data-table/data-table.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, DataTableService.DataTableService],
})
export class UserComponent implements OnInit, OnDestroy {
  loadedUser: DataTableService.User;
  loadedUserToucher: boolean = false;

  myGroup: FormGroup;
  userFound: boolean = true;
  emailExists: boolean = false;
  searchMode: boolean = true;
  userAlreadyExists: boolean = false;
  getItemSub: Subscription;
  sortSub: Subscription;
  sortedUserData: DataTableService.User[];

  selectedData: DataTableService.User;
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
    private dtTblService: DataTableService.DataTableService
  ) {
    this.sortedUserData = userService.getUsers();
  }

  ngOnInit(): void {
    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      this.dtTblService.emitDataChanged(this.sortedUserData.slice());
    });
    this.dtTblService.emitDataChanged(this.sortedUserData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.sortData(sort);
    });
    this.initForm();

    this.rowSelectSubscription = this.dtTblService.selectRow.subscribe(
      (data: DataTableService.User) => {
        this.myGroup = new FormGroup({
          user_id: new FormControl(data.user_id, Validators.required),
          name: new FormControl(data.name, Validators.required),
          email: new FormControl(data.email, Validators.required),
          birth_date: new FormControl(data.birth_date, Validators.required),
          post: new FormControl(data.post, Validators.required),
        });
        this.onSearchUser();
        console.log(data);
      }
    );
  }

  initForm() {
    this.myGroup = new FormGroup({
      user_id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      birth_date: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      post: new FormControl('', Validators.required),
    });
  }

  sortData(sort: Sort) {
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

  onChangeMode() {
    this.clearForm();
    this.searchMode = !this.searchMode;
  }

  onSearchUser() {
    if (this.userService.getUser(this.myGroup.value.user_id)) {
      //lekérem a beirt azonosito szerinti felhasználót
      this.loadedUser = this.userService.getUser(
        Number(this.myGroup.value.user_id)
      );
      this.userFound = true;
      this.myGroup = new FormGroup({
        user_id: new FormControl(this.loadedUser.user_id, Validators.required),
        name: new FormControl(this.loadedUser.name, Validators.required),
        birth_date: new FormControl(
          this.loadedUser.birth_date.toISOString().split('T')[0],
          Validators.required
        ),
        email: new FormControl(this.loadedUser.email, Validators.required),
        post: new FormControl(this.loadedUser.post, Validators.required),
      });
    } else {
      this.clearForm();
      this.userFound = false;
    }
    console.log(this.userFound);
  }

  onDelete() {
    this.userService.deleteUser(Number(this.myGroup.value.user_id));
    this.userDataChanged();
    this.clearForm();
    this.loadedUser = null;
  }

  checkUserAlreadyExists() {
    if (this.userService.getUser(Number(this.myGroup.value.user_id))) {
      this.userAlreadyExists = true;
    } else {
      this.userAlreadyExists = false;
    }
  }

  onSubmit() {
    console.log(this.userAlreadyExists);
    this.emailExists = this.userService.saveUser({
      user_id: Number(this.myGroup.value.user_id),
      name: this.myGroup.value.name,
      birth_date: new Date(this.myGroup.value.birth_date),
      email: this.myGroup.value.email,
      post: this.myGroup.value.post,
    });
    if (!this.emailExists) {
      this.userDataChanged();
    }
    this.clearForm();
    this.searchMode = true;
  }

  clearForm() {
    this.myGroup.reset();
    this.emailExists = false;
    this.userAlreadyExists = false;
    this.userFound = true;
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
  }
}
