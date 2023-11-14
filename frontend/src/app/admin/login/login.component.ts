import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isSignedIn() {
    return this.authService.isSignedIn();
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe({
        next: (response) => {
          this.toastr.success('You did it!', 'Sign in successful', {
            timeOut: 3000,
          });
        },
        error: (error) => {
          this.toastr.error('You did not do it 🙁', 'Sign in unsuccessful', {
            timeOut: 30000,
          });
        },
      });
    }
  }
}
