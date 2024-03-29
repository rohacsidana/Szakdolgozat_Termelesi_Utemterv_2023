import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;
  error: string = null;
  isLoading: boolean = false;
  changeNeeded: boolean = false;
  changeNeededSub: Subscription;
  err: string = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private DataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.changeNeededSub = this.authService.changeNeededChanged.subscribe(
      (bool) => {
        this.changeNeeded = bool;
      }
    );

    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLogin() {
    this.isLoading = true;
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        (data) => {

          this.isLoading = false;
          this.changeNeeded = this.form.value.password === 'changeme';
          if (!this.changeNeeded) {
            this.authService.handleAuthentication(
              data.email,
              +data.id,
              data.token,
              data.expire,
              +data.post,
              data.name
            );

            this.router.navigate(['/home']);
            //this.authService
          } else {
            this.authService.handleAuthentication(
              data.email,
              +data.id,
              data.token,
              data.expire,
              +data.post,
              data.name
            );
            this.authService.setChangeNeeded(this.changeNeeded);
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error.error);
          switch (error.error) {
            case 'EMAIL_NOT_FOUND': {
              this.error = 'Az e-mail cím nem található.';
              break;
            }
            case 'INVALID_PASSWORD': {
              this.error = 'Helytelen jelszó.';
              break;
            }
            default: {
              this.error = 'Hiba történt a bejelentkezéskor.';
              break;
            }
          }
        }
      );
  }

  onHandleError() {
    this.error = null;
  }
  onSave(pw) {
    this.DataStorageService.changePwByUser(pw).subscribe(
      () => {
        this.changeNeeded = false;
        localStorage.removeItem('changeNeeded');
        this.authService.setChangeNeeded(this.changeNeeded);
        this.authService.logout();
      },
      (error) => {
        this.err = error.error;
      }
    );
  }

  ngOnDestroy(): void {
    console.log('login ng destroy');

    if (this.changeNeeded) {
      this.authService.logout();
    }
  }
}
