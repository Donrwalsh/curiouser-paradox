import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.apiHost}/auth/login`, { username, password })
      .pipe(shareReplay());
  }
}
