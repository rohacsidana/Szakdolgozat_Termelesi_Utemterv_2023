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
  providers: [UserService],
})
export class UserComponent implements OnInit, OnDestroy {
  loadedUser: DataTableService.User;
  userFound: boolean = true;
  searchMode: boolean = true;
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
      console.log(this.sortedUserData);

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

  onSubmit(form: NgForm) {}

  clearForm() {
    this.userFound = true;
    this.name.setValue('');
    this.birth_date.setValue('');
    this.email.setValue('');
    this.post.setValue('');
  }

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
  }
}
