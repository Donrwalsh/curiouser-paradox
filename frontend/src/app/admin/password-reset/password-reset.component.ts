import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  Form,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { FieldMatchValidator } from 'src/app/common/validators/field-match.validator';
import { FieldsDontMatchValidator } from 'src/app/common/validators/fields-dont-match.validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  passwordResetForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.passwordResetForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPasswordOne: ['', Validators.required],
        newPasswordTwo: ['', Validators.required],
      },
      {
        validators: [
          FieldMatchValidator('newPasswordOne', 'newPasswordTwo'),
          FieldsDontMatchValidator('oldPassword', 'newPasswordOne'),
        ],
      } as AbstractControlOptions
    );
  }

  inputFieldUpdate() {
    Array.prototype.slice
      .call(document.querySelectorAll('.form-control'))
      .map((input) => {
        if (this.submitted) {
          if (this.passwordResetFormControls[input.id].valid) {
            input?.classList.remove('is-invalid');
            input?.classList.add('is-valid');
          } else {
            input?.classList.remove('is-valid');
            input?.classList.add('is-invalid');
          }
        }
      });
  }

  get passwordResetFormControls() {
    return this.passwordResetForm.controls;
  }

  isSignedIn() {
    return this.authService.isSignedIn();
  }

  reset() {
    console.log(this.passwordResetFormControls);

    this.submitted = true;
    this.inputFieldUpdate();
    if (this.passwordResetForm.valid) {
      console.log(this.passwordResetForm.value);
      this.authService
        .resetPassword(this.passwordResetForm.value)
        .subscribe((data: any) => {
          console.log(data);
        });
    }
  }
}
