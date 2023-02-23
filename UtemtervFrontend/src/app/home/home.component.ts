import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  userName: string = null;
  splitName: string[]
  firstName: string

  userSub: Subscription;
  constructor(private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((data)=>{
      if(data != null){
        this.userName = data.name
      }else{
        this.userName = null
      }
      
    })

    this.splitName = this.userName.split(/\s+/)
    
    if (this.splitName.length > 1) {
      this.firstName = this.splitName[1]
    }

    if (this.splitName.length == 1) {
      this.firstName = this.splitName[0]
    }
     
  }
 ngOnDestroy(): void {
   this.userSub.unsubscribe();
 }
}
