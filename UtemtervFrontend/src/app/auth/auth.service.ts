import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { take } from 'rxjs-compat/operator/take';
import { tap, delay, retry } from 'rxjs/operators';
import { DataStorageService, URL } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<LoggedInUser>(null);
  tokenExpirationTimer: any;
  tokenRefreshTimer: any;
  changeNeeded: boolean = false;
  changeNeededChanged = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  setChangeNeeded(bool) {
    this.changeNeeded = bool;
    this.changeNeededChanged.next(this.changeNeeded);
  }
  login(user, pw) {
    const bodyData = { UserEmail: user, Password: pw };
    return this.http.post<IUser>(URL + '/auth/login', bodyData);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loggedInUser = new LoggedInUser(
      userData.email,
      +userData.id,
      +userData._post,
      userData._token,
      userData._tokenExpirationDate,
      userData.name
    );

    if (loggedInUser.token) {
      this.changeNeeded = JSON.parse(localStorage.getItem('changeNeeded'));
      this.user.next(loggedInUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(+expirationDuration);
      const ido = new Date();
            ido.setMinutes(ido.getMinutes() + 1);
            const refreshTime = new Date(userData._tokenExpirationDate).getTime() - ido.getTime();
    this.autoRefreshToken(refreshTime);
    }
  }
  autoLogout(expirationDuration: number) {
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
  public handleAuthentication(
    email: string,
    userId: number,
    token: string,
    expires: Date,
    post: number,
    name: string
  ) {
    const expirationDuration =
      new Date(expires).getTime() - new Date().getTime();
    const user = new LoggedInUser(email, +userId, +post, token, expires, name);
    this.user.next(user);
    this.autoLogout(expirationDuration);
    const ido = new Date();
            ido.setMinutes(ido.getMinutes() + 1);
            const refreshTime = new Date(expires).getTime() - ido.getTime();
    this.autoRefreshToken(refreshTime);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoRefreshToken(reTime: number) {
    this.tokenRefreshTimer = setTimeout(() => {
      this.http
        .get<any>(URL + '/auth/refresh')
        .pipe(retry(5))
        .subscribe((data) => {
          console.log(data.name);

          clearTimeout(this.tokenExpirationTimer);
          clearTimeout(this.tokenRefreshTimer);
          const loggedInUser = new LoggedInUser(
            data.email,
            +data.id,
            +data.post,
            data.token,
            data.expire,
            data.name
          );
          if (loggedInUser.token) {
            this.changeNeeded = JSON.parse(
              localStorage.getItem('changeNeeded')
            );
            this.user.next(loggedInUser);
            const expirationDuration =
              new Date(data.expire).getTime() - new Date().getTime();

            const ido = new Date();
            ido.setMinutes(ido.getMinutes() + 1);
            const refreshTime = new Date(data.expire).getTime() - ido.getTime();

            this.autoLogout(+expirationDuration);
            localStorage.setItem('userData', JSON.stringify(loggedInUser));
            this.autoRefreshToken(refreshTime);
          }
        });
    }, reTime);
  }
}

export class LoggedInUser {
  constructor(
    public email: string,
    public id: number,
    private _post: number,
    private _token: string,
    private _tokenExpirationDate: Date,
    public name: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
  get tokenExpirationDate() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._tokenExpirationDate;
  }
  get post() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._post;
  }
}

interface IUser {
  post: number;
  id: number;
  email: string;
  token: string;
  expire: Date;
  name: string;
}
