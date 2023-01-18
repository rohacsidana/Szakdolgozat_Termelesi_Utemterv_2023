import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  users = [
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
}
