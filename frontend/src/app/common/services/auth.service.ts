import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
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

  refreshObservable?: Observable<any>;

  isSignedIn() {
    return !(
      localStorage.getItem('access_token') === null &&
      localStorage.getItem('refresh_token') === null
    );
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
    if (this.refreshObservable) {
      return this.refreshObservable;
    } else {
      this.refreshObservable = this.http
        .post<AuthResult>(`${environment.apiHost}/auth/refresh`, {
          refreshToken: token,
        })
        .pipe(
          share(),
          tap((data: AuthResult) => this.setSession(data))
        );
    }

    return this.refreshObservable;
  }

  setSession(authResult: AuthResult) {
    if (
      authResult.accessToken !== localStorage.getItem('access_token') &&
      authResult.refreshToken !== localStorage.getItem('refresh_token')
    ) {
      console.log('setting session data');
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('refresh_token', authResult.refreshToken);
    }
  }

  clearSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  signOut() {
    return this.http.get<any>(`${environment.apiHost}/auth/sign-out`, {});
  }
}
