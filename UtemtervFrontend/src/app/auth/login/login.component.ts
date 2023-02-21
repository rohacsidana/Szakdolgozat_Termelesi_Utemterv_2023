import { Component } from '@angular/core';
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
export class LoginComponent {
  form: FormGroup;
  error: string = null;
  isLoading: boolean = false;
  changeNeeded: boolean = false;
  changeNeededSub: Subscription;
  err: string = null ;
  constructor(private authService: AuthService, private router: Router, private DataStorageService: DataStorageService) {}

  ngOnInit() {
    this.changeNeededSub = this.authService.changeNeededChanged.subscribe(
      (bool)=>{
        this.changeNeeded = bool;
      }
      )

    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
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
          this.changeNeeded = this.form.value.password === "changeme"
          if(!this.changeNeeded){
            this.router.navigate(['/home']);
            //this.authService
          }else{
            this.authService.setChangeNeeded(this.changeNeeded);
          }
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
  onSave(pw){
    this.DataStorageService.changePwByUser(pw)
      .subscribe(
        ()=>{
          this.changeNeeded = false;
          this.authService.setChangeNeeded(this.changeNeeded);
          this.router.navigate(['/home']);

        },
        error=>{
          this.err = error.error;
        }
      )
  }
}
