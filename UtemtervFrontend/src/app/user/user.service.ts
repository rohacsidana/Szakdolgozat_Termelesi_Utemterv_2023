import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: User[] = [];

  userDataChanged: Subject<User[]> = new Subject<User[]>();
  emailExists: boolean = false;

  setUsers(data: User[]) {
    console.log('setting users');
    this.userData = data.slice();
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

  saveUser(newUser: User) {
    this.userData.push(newUser);
    this.userDataChanged.next(this.userData.slice());
  }

  updateUser(updatedUser: User) {
    let userToUpdate: User = this.getUser(updatedUser.user_id);
    this.userData[this.userData.indexOf(userToUpdate)] = updatedUser;
    this.userDataChanged.next(this.userData.slice());
  }

  deleteUser(id: number) {
    if (this.getUser(id)) {
      this.userData.splice(this.userData.indexOf(this.getUser(id)), 1);
      this.userDataChanged.next(this.userData.slice());
    }
  }
}
