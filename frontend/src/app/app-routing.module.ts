import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComicComponent } from './comic/main-comic/main-comic.component';
import { AllComicsComponent } from './comic/all-comics/all-comics.component';
import { MainAdminComponent } from 'src/app/admin/main-admin/main-admin.component';
import { PlayComponent } from 'src/app/admin/play/play.component';
import { NewComicComponent } from 'src/app/comic/new-comic/new-comic.component';

const TITLE = 'Curiouser Paradox';

const routes: Routes = [
  { path: '', component: MainComicComponent, title: TITLE },
  { path: 'all', component: AllComicsComponent, title: TITLE },
  { path: 'admin', component: MainAdminComponent, title: TITLE },
  { path: 'admin/comic/new', component: NewComicComponent, title: TITLE },
  { path: 'admin/play', component: PlayComponent, title: TITLE },
  { path: ':id', component: MainComicComponent, title: TITLE },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
