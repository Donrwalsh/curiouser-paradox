import { Component } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent {
  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut().subscribe(() => {
      console.log('Successfully logged out!');
      this.authService.clearSession();
    });
  }

  isSignedIn() {
    return this.authService.isSignedIn();
  }
}
