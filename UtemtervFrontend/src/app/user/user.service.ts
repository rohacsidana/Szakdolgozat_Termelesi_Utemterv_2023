import { Injectable } from '@angular/core';
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

  saveUser(user: User) {
    if (this.getUser(user.user_id)) {
      //ha létezik ilyen user_id-jű user, updateljuk
      let userToChange: User =
        this.userData[this.userData.indexOf(this.getUser(user.user_id))];
      userToChange.birth_date = user.birth_date;
      userToChange.email = user.email;
      userToChange.name = user.name;
      userToChange.post = user.post;
      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].user_id == user.user_id) {
          this.userData[i] = user;
        }
      }
      return false;
    } else {
      let emailExists: boolean = false;
      let i = 0;
      while (i < this.userData.length && this.userData[i].email != user.email) {
        //eldöntjük, létezik-e már az email
        i++;
      }
      emailExists = i < this.userData.length;
      if (!emailExists) {
        //ha nincs ilyen user & email sem szerepel, léterehozzuk
        this.userData.push(user);
      } else {
        return true; //visszaadjuk, h már létezik
      }
    }
  }

  deleteUser(id: number) {
    //console.log(this.getUser(id));

    if (this.getUser(id)) {
      this.userData.splice(this.userData.indexOf(this.getUser(id)), 1);
    }
  }
}
