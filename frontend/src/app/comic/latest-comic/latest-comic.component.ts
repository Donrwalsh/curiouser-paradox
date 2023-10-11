import { Component } from '@angular/core';
import { Comic } from '../comic.model';
import { ComicService } from '../comic.service';
import { initialComic } from '../comic.model';

@Component({
  selector: 'app-latest-comic',
  templateUrl: './latest-comic.component.html',
  styleUrls: ['./latest-comic.component.scss'],
})
export class LatestComicComponent {
  constructor(private comicService: ComicService) {}

  comic = { ...initialComic };

  ngOnInit() {
    this.comicService.getLatest().subscribe((data) => {
      this.comic = (data as any).latestComic as Comic;
    });
  }
}
