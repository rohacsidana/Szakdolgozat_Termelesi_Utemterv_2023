import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../data-table/data-table.service';

@Injectable()
export class UserService {
  private userData: User[] = [
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

  getUsers() {
    return this.userData.slice();
  }

  getUser(id: number): User {
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i].user_id == id) {
        return this.userData[i];
      }
    }
  }
}
