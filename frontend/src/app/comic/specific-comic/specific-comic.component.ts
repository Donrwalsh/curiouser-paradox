import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comic, initialComic, notFoundComic } from '../comic.model';
import { ComicService } from '../comic.service';

@Component({
  selector: 'app-specific-comic',
  templateUrl: './specific-comic.component.html',
  styleUrls: ['./specific-comic.component.scss'],
})
export class SpecificComicComponent {
  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService
  ) {}

  comic = { ...initialComic };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.comicService.getSpecific(this.id || '').subscribe({
      next: (success: any) => (this.comic = success.specificComic as Comic),
      error: (error: any) => (this.comic = notFoundComic),
    });
  }
}
