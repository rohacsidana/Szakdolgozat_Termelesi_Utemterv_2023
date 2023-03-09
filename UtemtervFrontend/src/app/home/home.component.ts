import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  userName: string = null;
  splitName: string[];
  firstName: string;
  post: number;
  postName: string;
  id: number;

  userSub: Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((data) => {
      if (data != null) {
        this.userName = data.name;
      } else {
        this.userName = null;
      }
      this.post = data.post;
      this.id = data.id;
    });

    this.splitName = this.userName.split(/\s+/);

    if (this.splitName.length > 1) {
      this.firstName = this.splitName[1];
    }

    if (this.splitName.length == 1) {
      this.firstName = this.splitName[0];
    }

    switch (this.post) {
      case 1: {
        this.postName = 'Admin';
        break;
      }
      case 2: {
        this.postName = 'Termelés vezető';
        break;
      }
      case 3: {
        this.postName = 'Készletgazda';
        break;
      }
    }
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
