import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from './header/header.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module';
import { ComicModule } from './comic/comic.module';
import { ComicService } from './comic/comic.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComicModule,
    FooterModule,
    HeaderModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [ComicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
