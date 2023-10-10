import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestComicComponent } from './latest-comic/latest-comic.component';

@NgModule({
  declarations: [LatestComicComponent],
  imports: [CommonModule],
  exports: [LatestComicComponent],
})
export class ComicModule {}
