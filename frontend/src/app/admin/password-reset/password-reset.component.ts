import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { MatchValidator } from 'src/app/common/validators/match.validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  passwordResetForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.passwordResetForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPasswordOne: ['', [Validators.required]],
        newPasswordTwo: ['', Validators.required],
      },
      {
        validators: [
          MatchValidator('newPasswordOne', 'newPasswordTwo'),
          MatchValidator('oldPassword', 'newPasswordOne', false),
        ],
      } as AbstractControlOptions
    );
  }

  inputFieldValidity(fieldName: string) {
    return {
      'is-valid':
        this.controls[fieldName].valid && this.controls[fieldName].dirty,
      'is-invalid':
        this.controls[fieldName].invalid && this.controls[fieldName].dirty,
    };
  }

  get controls() {
    return this.passwordResetForm.controls;
  }

  isSignedIn() {
    return this.authService.isSignedIn();
  }

  reset() {
    Object.keys(this.controls).forEach((key) => {
      this.passwordResetForm.controls[key].markAsDirty();
    });

    if (this.passwordResetForm.valid) {
      this.authService
        .resetPassword(this.passwordResetForm.value)
        .subscribe((data: any) => {
          console.log(data);
        });
    }
  }
}
