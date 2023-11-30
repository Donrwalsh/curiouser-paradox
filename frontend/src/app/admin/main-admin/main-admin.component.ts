import { Component } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss'],
})
export class MainAdminComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.heartbeat().subscribe((data) => {
      console.log(data);
    });
  }

  isSignedIn() {
    return this.authService.isSignedIn();
  }
}
