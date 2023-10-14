import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComicComponent } from './comic/main-comic/main-comic.component';

const TITLE = 'Curiouser Paradox';

const routes: Routes = [
  { path: '', component: MainComicComponent, title: TITLE },
  { path: ':id', component: MainComicComponent, title: TITLE },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
