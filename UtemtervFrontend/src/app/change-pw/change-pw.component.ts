import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css'],
})
export class ChangePwComponent implements OnInit {
  form: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();
  @Input() errorMessage: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group(
      {
        pw: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25),
            Validators.pattern(
              /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/
            ),
          ],
        ],
        confirmPw: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25),
            Validators.pattern(
              /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/
            ),
          ],
        ],
      },
      { validators: this.checkPasswords }
    );
  }

  clog() {
    /*
    console.log(`form:`);
    console.log(this.form); */
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    this.save.emit(this.form.value.pw);
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('pw').value;
    let passAgain = group.get('confirmPw').value;
    return pass === passAgain ? null : { notSame: true };
  };
}
