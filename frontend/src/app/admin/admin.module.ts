import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { PlayComponent } from './play/play.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CustomHighlightPlayDirective } from 'src/app/common/directives/custom-highlight-play.directive';

@NgModule({
  declarations: [
    LoginComponent,
    MainAdminComponent,
    PlayComponent,
    PasswordResetComponent,
    CustomHighlightPlayDirective,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
