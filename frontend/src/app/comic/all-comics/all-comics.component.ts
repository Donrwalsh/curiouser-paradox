import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComicService } from '../../common/services/comic.service';
import { Comic, ComicDTO } from '../comic.model';

@Component({
  selector: 'app-all-comics',
  templateUrl: './all-comics.component.html',
  styleUrls: ['./all-comics.component.scss'],
})
export class AllComicsComponent {
  apiHost = environment.apiHost;
  selfHost = environment.selfHost;

  comics = [] as Comic[];

  constructor(private comicService: ComicService) {}

  ngOnInit() {
    this.comicService.getAllComics().subscribe((data) => {
      this.comics = (data as ComicDTO).payload;
    });
  }
}
