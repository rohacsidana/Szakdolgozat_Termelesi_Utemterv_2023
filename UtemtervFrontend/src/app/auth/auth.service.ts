import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;

  login(email: string, password: string): Observable<any> {
    console.log(email);
    console.log(password);
    this.loggedIn = email == 'admin@admin.hu' && password == 'admin';
    localStorage.setItem('loggedIn', this.loggedIn ? 'true' : 'false');

    return of(this.loggedIn).pipe(
      
      tap((val) => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  constructor() {}
}
