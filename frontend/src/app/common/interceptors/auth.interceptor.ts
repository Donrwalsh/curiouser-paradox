import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private http: HttpClient) {}

  isRefreshing = false;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const refresh_token = localStorage.getItem('refresh_token');
    let access_token = localStorage.getItem('access_token');

    if (!req.url.includes('auth/refresh')) {
      if (access_token) {
        if (this.isTokenExpired(access_token)) {
          if (refresh_token && !this.isTokenExpired(refresh_token)) {
            await lastValueFrom(this.authService.refresh(refresh_token!)).catch(
              (error: HttpErrorResponse) => {
                console.log('error: ', error);
                this.authService.clearSession();
                return 'an error has occured';
              }
            );
            access_token = localStorage.getItem('access_token');
          } else {
            this.authService.clearSession();
            return await lastValueFrom(next.handle(req));
          }
        }
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + access_token),
        });
        return lastValueFrom(next.handle(cloned));
      }
    }

    return await lastValueFrom(next.handle(req));
  }

  private isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    console.log(`${(expiry * 1000 - Date.now()) / 1000} seconds remaining`);
    return expiry * 1000 < Date.now();
  }
}
