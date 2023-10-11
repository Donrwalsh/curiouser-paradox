import { Component } from '@angular/core';
import { ComicService } from '../comic.service';
import { map } from 'rxjs/operators';
import { Comic } from '../comic.model';

@Component({
  selector: 'app-latest-comic',
  templateUrl: './latest-comic.component.html',
  styleUrls: ['./latest-comic.component.scss'],
})
export class LatestComicComponent {
  constructor(private comicService: ComicService) {}

  comic: Comic = {
    title: '',
    altText: '',
    path: '',
    index: 0,
  };

  ngOnInit() {
    this.comicService.getLatest().subscribe((data) => {
      this.comic = data as Comic;
    });
  }
}
