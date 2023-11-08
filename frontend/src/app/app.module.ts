import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthInterceptor } from 'src/app/common/services/interceptors/auth.interceptor';

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
  ],
  providers: [
    ComicService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
