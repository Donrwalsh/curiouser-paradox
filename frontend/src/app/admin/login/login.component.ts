import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe(() => {
        console.log('Successfully logged in!');
      });
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('Successfully logged out!');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    });
  }

  tryItOut() {
    this.authService.tryItOut().subscribe(() => {
      console.log('It worked!');
    });
  }
}
