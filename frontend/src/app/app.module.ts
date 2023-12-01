import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from './header/header.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from 'src/app/admin/admin.module';
import { AuthService } from 'src/app/common/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicModule } from './comic/comic.module';
import { FooterModule } from './footer/footer.module';
import { ComicService } from './common/services/comic.service';
import { AuthInterceptor } from 'src/app/common/interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ComicModule,
    FooterModule,
    HeaderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      // Never expires
      timeOut: 0,
      extendedTimeOut: 500,
      positionClass: 'toast-top-right',
      closeButton: true,
    }),
  ],
  providers: [
    ComicService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [AuthService, HttpClient],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
