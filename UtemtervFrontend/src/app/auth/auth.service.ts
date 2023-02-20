import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { DataStorageService, URL } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<LogedInUser>(null);
  constructor(private http: HttpClient) {}

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
            this.handleAuthentication(res.email, res.id, res.token, res.expire, res.post)
          },
          error: (error) => this.handleError(error),
        })
      );
  }
  
  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
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
    expires: string,
    post : number
  ) {
    
    const user = new LogedInUser(email, userId, post, token, new Date(expires));
    this.user.next(user);

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
  expire: string;
}
