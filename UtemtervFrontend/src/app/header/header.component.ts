import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy, OnInit {
  loggedIn: boolean = false;
  userName: string;
  timer: any;
  exp: Date;
  time: string;
  role: number;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  userSub: Subscription;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}
  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((data) => {
      
      if (data != null) {
        this.role= data.post;
        this.userName = data.name;
        this.loggedIn = true;
        this.exp = data.tokenExpirationDate;
        this.timer = setInterval(() => {
          this.time = this.valt(
            new Date(this.exp).getTime() - new Date().getTime()
          );
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.loggedIn = false;
        this.userName = null;
        this.role = null;
        this.exp = null;
        this.time = null;
      }
    });
    this.authService.autoLogin();
  }
  valt(sec) {
    sec = Math.floor(sec / 1000);
    let hours = Math.floor(sec / 3600);

    let minutes = Math.floor(sec / 60) % 60;

    let seconds = sec % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    clearInterval(this.timer);
  }
}
