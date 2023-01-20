import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
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

  userFound: boolean = true;
  searchMode: boolean = true;
  userExists: boolean = false;
  getItemSub: Subscription;
  sortedUserData: DataTableService.User[];

  user_id = new FormControl('');
  name = new FormControl('');
  birth_date = new FormControl('');
  email = new FormControl('');
  post = new FormControl('');

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
      this.dtTblService.sortedDataEmit(this.sortedUserData.slice());
    });
  }

  sortData(sort: Sort) {
    const data = this.userService.getUsers();
    if (!sort.active || sort.direction === '') {
      this.sortedUserData = data;
      this.dtTblService.sortedDataEmit(this.sortedUserData.slice());
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
    this.dtTblService.sortedDataEmit(this.sortedUserData.slice());
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangeMode() {
    this.clearForm();
    this.user_id.setValue('');
    this.searchMode = !this.searchMode;
  }

  onSearchUser() {
    this.clearForm();
    this.loadedUser = this.userService.getUser(Number(this.user_id.value));
    if (this.userService.getUsers().indexOf(this.loadedUser) != -1) {
      this.userFound = true;
      this.name.setValue(this.loadedUser.name);
      this.birth_date.setValue(
        this.loadedUser.birth_date.toISOString().split('T')[0]
      );
      this.email.setValue(this.loadedUser.email);
      this.post.setValue(this.loadedUser.post);
    } else {
      this.userFound = false;
    }
  }

  onDelete() {
    this.userService.deleteUser(Number(this.user_id.value));
    this.userDataChanged();
    this.clearForm();
    this.user_id.setValue('');
    this.loadedUser = null;
  }

  checkUserExists() {
    if (this.userService.getUser(Number(this.user_id.value))) {
      this.userExists = true;
    } else {
      this.userExists = false;
    }
  }

  onSubmit(form: NgForm) {
    this.userService.saveUser({
      user_id: Number(this.user_id.value),
      name: this.name.value,
      birth_date: new Date(this.birth_date.value),
      email: this.email.value,
      post: this.post.value,
    });
    this.userDataChanged();
  }

  clearForm() {
    this.userExists = false;
    this.userFound = true;
    this.name.setValue('');
    this.birth_date.setValue('');
    this.email.setValue('');
    this.post.setValue('');
  }

  userDataChanged() {
    this.sortedUserData = this.userService.getUsers();
    this.dtTblService.sortedDataEmit(this.sortedUserData.slice());
  }

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
  }
}
