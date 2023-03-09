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
  exp: Date;
  role: number;
  changeNeeded: boolean = false;
  changeNeededSub: Subscription;
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
    this.changeNeededSub = this.authService.changeNeededChanged.subscribe(
      (bool) => {
        this.changeNeeded = bool;
      }
    );
    this.userSub = this.authService.user.subscribe((data) => {
      if (data != null) {
        
        this.role = data.post;
        this.userName = data.name;
        this.loggedIn = true;
        this.exp = data.tokenExpirationDate;
      } else {

        this.loggedIn = false;
        this.userName = null;
        this.role = null;
        this.exp = null;
        
      }
    });
    this.authService.autoLogin();
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.changeNeededSub.unsubscribe();
 
  }
}
