import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComicService } from '../../common/services/comic.service';
import { Comic, ComicDTO } from '../../common/models/comic.model';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-all-comics',
  templateUrl: './all-comics.component.html',
  styleUrls: ['./all-comics.component.scss'],
})
export class AllComicsComponent {
  apiHost = environment.apiHost;
  selfHost = environment.selfHost;

  comics = [] as Comic[];

  constructor(
    private authService: AuthService,
    private comicService: ComicService
  ) {}

  ngOnInit() {
    (this.authService.isSignedIn()
      ? this.comicService.getAllComicsAdmin()
      : this.comicService.getAllComics()
    ).subscribe((data) => {
      this.comics = (data as ComicDTO).payload;
    });
  }
}
