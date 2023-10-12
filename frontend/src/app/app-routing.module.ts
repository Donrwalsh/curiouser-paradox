import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComicComponent } from './comic/main-comic/main-comic.component';

const routes: Routes = [
  { path: '', component: MainComicComponent },
  { path: ':id', component: MainComicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
