import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MainComicComponent } from './main-comic/main-comic.component';
import { AllComicsComponent } from './all-comics/all-comics.component';

@NgModule({
  declarations: [MainComicComponent, AllComicsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
  ],
  exports: [],
})
export class ComicModule {}
