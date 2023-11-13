import { Component } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss'],
})
export class MainAdminComponent {
  constructor(private authService: AuthService) {}

  isSignedIn() {
    return this.authService.isSignedIn();
  }
}
