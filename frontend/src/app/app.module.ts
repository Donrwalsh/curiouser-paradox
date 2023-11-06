import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from './header/header.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from 'src/app/admin/admin.module';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicModule } from './comic/comic.module';
import { FooterModule } from './footer/footer.module';
import { ComicService } from './services/comic.service';

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
  providers: [ComicService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
