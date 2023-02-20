import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy{
  loggedIn:boolean = false
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    userSub: Subscription;
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
    this.userSub = this.authService.user.subscribe((data)=>{
      if(data != null){
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
      
    })
  }
      logout(){
        this.authService.logout();
      }

      ngOnDestroy(): void {
        this.userSub.unsubscribe();
      }
}
