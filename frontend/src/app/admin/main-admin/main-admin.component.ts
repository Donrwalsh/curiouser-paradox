import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { FieldMatchValidator } from 'src/app/common/validators/field-match.validator';
import { FieldsDontMatchValidator } from 'src/app/common/validators/fields-dont-match.validator';

// The current state of this form is that the validation is in place (to the best of my knowledge)
// But the only error that actually shows on the page is for the required field old password. The
// other validation is being respected, but it will not show on the page ~ and should be verified
// such that it works correctly in the way that it seems to.
// And then from there we need to submit the payload and build out the backend to support the functionality.

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss'],
})
export class MainAdminComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group(
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
      }
    );
  }

  inputFieldUpdate() {
    Array.prototype.slice
      .call(document.querySelectorAll('.form-control'))
      .map((input) => {
        if (this.submitted) {
          if (this.passwordFormControls[input.id].valid) {
            input?.classList.remove('is-invalid');
            input?.classList.add('is-valid');
          } else {
            input?.classList.remove('is-valid');
            input?.classList.add('is-invalid');
          }
        }
      });
  }

  get passwordFormControls() {
    return this.form.controls;
  }

  isSignedIn() {
    return this.authService.isSignedIn();
  }

  reset() {
    console.log(this.passwordFormControls);

    this.submitted = true;
    this.inputFieldUpdate();
    if (this.form.valid) {
      console.log("Looks good, let's submit the form:");
      console.log(this.form.value);
      console.log('TODO: Submit this data and handle it on the backend');
    }
  }
}
