import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestComicComponent } from './comic/latest-comic/latest-comic.component';
import { SpecificComicComponent } from './comic/specific-comic/specific-comic.component';

const routes: Routes = [
  { path: '', component: LatestComicComponent },
  { path: ':id', component: SpecificComicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
