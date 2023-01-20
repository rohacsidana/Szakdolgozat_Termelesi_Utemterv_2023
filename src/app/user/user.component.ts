import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import * as DataTableService from '../data-table/data-table.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  getItemSub: Subscription;
  sortedUserData: DataTableService.User[];
  userData: DataTableService.User[] = [
    {
      user_id: 1,
      name: 'Rohácsi Daniella',
      birth_date: new Date('2002-03-24'),
      email: 'rohacsi.dana@gmail.com',
      post: '1',
    },
    {
      user_id: 2,
      name: 'Koncsik Benedek',
      birth_date: new Date('2001-05-11'),
      email: 'kncsk.benedek@gmail.com',
      post: '2',
    },
    {
      user_id: 3,
      name: 'Berényi Péter Ferenc',
      birth_date: new Date('2003-01-10'),
      email: 'berenyi.peter@gmail.com',
      post: '3',
    },
  ];

  userHeaders = [
    { name: 'user_id', szoveg: 'Felhasználó ID' },
    { name: 'name', szoveg: 'Név' },
    { name: 'birth_date', szoveg: 'Születési dátum' },
    { name: 'email', szoveg: 'Email' },
    { name: 'post', szoveg: 'Besorolás' },
  ];
  constructor(private dtTblService: DataTableService.DataTableService) {
    this.sortedUserData = this.userData.slice();
  }

  ngOnInit(): void {
    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      console.log(this.sortedUserData);

      this.dtTblService.sortedDataEmit(this.sortedUserData.slice());
    });
  }

  sortData(sort: Sort) {
    const data = this.userData.slice();
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

  onSubmit(form: NgForm) {}

  ngOnDestroy(): void {
    this.getItemSub.unsubscribe();
  }
}
