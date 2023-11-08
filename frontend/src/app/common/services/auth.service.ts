import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

export interface User {
  username: string;
  password: string;
}

export interface AuthResult {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  tryItOut() {
    return this.http
      .get(`${environment.apiHost}/comics/admin/all`)
      .pipe(map((res) => res));
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResult>(`${environment.apiHost}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((data: AuthResult) => this.setSession(data)),
        shareReplay()
      );
  }

  setSession(authResult: AuthResult) {
    localStorage.setItem('jwt', authResult.access_token);
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}
