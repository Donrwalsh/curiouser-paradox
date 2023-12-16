import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MainComicComponent } from './main-comic/main-comic.component';
import { AllComicsComponent } from './all-comics/all-comics.component';
import { NewComicComponent } from './new-comic/new-comic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComicInputComponent } from './comic-input/comic-input.component';
import { FormControlPipe } from 'src/app/common/pipes/form-control';

@NgModule({
  declarations: [
    MainComicComponent,
    AllComicsComponent,
    NewComicComponent,
    ComicInputComponent,
    FormControlPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class ComicModule {}
