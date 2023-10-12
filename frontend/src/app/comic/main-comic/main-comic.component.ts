import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../comic.service';
import { Comic, ComicDTO, initialComic, notFoundComic } from '../comic.model';

@Component({
  selector: 'app-main-comic',
  templateUrl: './main-comic.component.html',
  styleUrls: ['./main-comic.component.scss'],
})
export class MainComicComponent {
  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService
  ) {}

  comic = { ...initialComic };

  nextComicIndex = null;
  prevComicIndex = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.comicService.getSpecific(this.id).subscribe({
        next: (success: any) => {
          const comicDto = success as ComicDTO;
          this.comic = comicDto.specificComic as Comic;
        },
        error: (error: any) => (this.comic = notFoundComic),
      });
    } else {
      this.comicService.getLatest().subscribe((data) => {
        this.comic = (data as any).latestComic as Comic;
      });
    }
  }
}
