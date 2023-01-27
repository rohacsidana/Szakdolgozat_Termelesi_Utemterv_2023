import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../data-table/data-table.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: User[] = [];

  userDataChanged: Subject<User[]> = new Subject<User[]>();

  setUsers(userData: User[]) {
    console.log('setting users');

    this.userData = userData.slice();
    console.log(this.userData);
    this.userData.forEach((user) => {
      console.log(user.birth_date);
    });
    this.userDataChanged.next(this.userData.slice());
  }

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
      this.userDataChanged.next(this.userData.slice());
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
        console.log();

        user.user_id = this.userData[this.userData.length - 1].user_id + 1;
        this.userData.push(user);
        //itt még változtatni kell a http kérés response-a alapján
        this.userDataChanged.next(this.userData.slice());
      } else {
        return true; //visszaadjuk, h már létezik
      }
    }
  }

  deleteUser(id: number) {
    if (this.getUser(id)) {
      this.userData.splice(this.userData.indexOf(this.getUser(id)), 1);
      this.userDataChanged.next(this.userData.slice());
    }
  }
}
