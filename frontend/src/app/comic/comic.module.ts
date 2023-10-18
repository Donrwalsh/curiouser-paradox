import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MainComicComponent } from './main-comic/main-comic.component';

@NgModule({
  declarations: [MainComicComponent],
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
