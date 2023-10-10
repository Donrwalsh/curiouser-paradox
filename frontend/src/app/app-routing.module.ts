import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestComicComponent } from './comic/latest-comic/latest-comic.component';

const routes: Routes = [{ path: '', component: LatestComicComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
