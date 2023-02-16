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

  email: string;
  password: string;

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
    this.email = this.form.value.userName;
    this.password = this.form.value.password;

    console.log('Login page: ' + this.email);
    console.log('Login page: ' + this.password);

    this.authService.login(this.email, this.password).subscribe((data) => {
      console.log('Login Success: ' + data);

      if (data) this.router.navigate(['/']);
    });
  }
}
