import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  error: string = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('admin@admin.hu', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('admin', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=S+$).{8,}$'
        ),
      ]),
    });
  }

  onLogin() {
    this.isLoading = true;
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isLoading = false;
          this.error = error;
        }
      );
  }

  onHandleError() {
    this.error = null;
  }
}
