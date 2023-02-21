import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { DataStorageService, URL } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<LogedInUser>(null);
  tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  login(user, pw) {
    const bodyData = { UserEmail: user, Password: pw };
    return this.http
      .post<IUser>(
        URL + '/auth/login',
        bodyData
      )
      .pipe(
        tap({
          next: (res) => {
            console.log(res);

            this.handleAuthentication(res.email, res.id, res.token, res.expire, res.post)
          },
          error: (error) => this.handleError(error),
        })
      );
  }
  


  autoLogin(){
    
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if(!userData){
      return
    }
    const logedInUser = new LogedInUser(userData.email, +userData.id, +userData.post, userData._token, userData._tokenExpirationDate);
   
    if(logedInUser.token){
      
      this.user.next(logedInUser)
      const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() -
      new Date().getTime();
      this.autoLogout(+expirationDuration);
    }
  }
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {

      this.logout();
    }, expirationDuration);
  }
  logout(): void {
    

    this.user.next(null);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/login']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    switch (errorRes.error) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
  private handleAuthentication(
    email: string,
    userId: number,
    token: string,
    expires: Date,
    post : number
  ) {
    const expirationDuration =
    new Date(expires).getTime() -
    new Date().getTime();
    const user = new LogedInUser(email, userId, post, token, expires)
    this.user.next(user);
    this.autoLogout(expirationDuration)
    localStorage.setItem('userData', JSON.stringify(user));
  }


}
export class LogedInUser {
  constructor(
    public email: string,
    public id: number,
    public post: number,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

interface IUser {
  post: number;
  id: number;
  email: string;
  token: string;
  expire: Date;
}
