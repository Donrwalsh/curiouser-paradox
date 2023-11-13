import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { ResetPasswordDTO } from 'src/app/common/models/auth.model';

export interface User {
  username: string;
  password: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isSignedIn() {
    return !(
      localStorage.getItem('access_token') === null &&
      localStorage.getItem('refresh_token') === null
    );
  }

  tryItOut() {
    return this.http
      .get(`${environment.apiHost}/comics/admin/all`)
      .pipe(map((res) => res));
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResult>(`${environment.apiHost}/auth/sign-in`, {
        username,
        password,
      })
      .pipe(
        tap((data: AuthResult) => this.setSession(data)),
        shareReplay()
      );
  }

  resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    return this.http
      .post(`${environment.apiHost}/auth/reset-password`, {
        ...resetPasswordDTO,
      })
      .pipe(tap((data: any) => console.log(data)));
  }

  refresh(token: string) {
    return this.http
      .post<AuthResult>(`${environment.apiHost}/auth/refresh`, {
        refreshToken: token,
      })
      .pipe(tap((data: AuthResult) => this.setSession(data)));
  }

  setSession(authResult: AuthResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('refresh_token', authResult.refreshToken);
  }

  clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  signOut() {
    return this.http.get<any>(`${environment.apiHost}/auth/sign-out`, {});
  }
}
