import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, lastValueFrom } from 'rxjs';
import { AuthResult, AuthService } from 'src/app/common/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    // Take no action on token refresh requests
    if (req.url.includes('auth/refresh')) {
      return lastValueFrom(next.handle(req));
    }

    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    // Both tokens must be present to proceed
    if (!access_token || !refresh_token) {
      this.authService.clearSession();
      return lastValueFrom(next.handle(req));
    }

    // Append access token to request if it is valid
    if (!this.isTokenExpired(access_token)) {
      return lastValueFrom(
        next.handle(
          req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + access_token),
          })
        )
      );
    }

    // Discard refresh token if it is expired
    if (this.isTokenExpired(refresh_token)) {
      this.authService.clearSession();
      return lastValueFrom(next.handle(req));
    } else {
    }

    // Refresh token is valid, so obtain fresh tokens and append access token to request
    await lastValueFrom(this.authService.refresh(refresh_token!));

    return lastValueFrom(
      next.handle(
        req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' + localStorage.getItem('access_token')
          ),
        })
      )
    );
  }

  private isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    // console.log(`${(expiry * 1000 - Date.now()) / 1000} seconds remaining`);
    return expiry * 1000 < Date.now();
  }
}
