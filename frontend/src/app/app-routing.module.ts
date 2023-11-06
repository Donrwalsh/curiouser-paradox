import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComicComponent } from './comic/main-comic/main-comic.component';
import { AllComicsComponent } from './comic/all-comics/all-comics.component';
import { LoginComponent } from 'src/app/admin/login/login.component';

const TITLE = 'Curiouser Paradox';

const routes: Routes = [
  { path: '', component: MainComicComponent, title: TITLE },
  { path: 'all', component: AllComicsComponent, title: TITLE },
  { path: 'admin', component: LoginComponent, title: TITLE },
  { path: ':id', component: MainComicComponent, title: TITLE },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
