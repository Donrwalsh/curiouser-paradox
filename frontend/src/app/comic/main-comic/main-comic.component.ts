import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private comicService: ComicService
  ) {}

  comic = { ...initialComic };
  indexes = [];

  ngOnInit() {
    this.obtainComicInfo(this.route.snapshot.paramMap.get('id'));

    this.comicService.getIndexes().subscribe((data) => {
      this.indexes = (data as any).allIndexes;
    });
  }

  obtainComicInfo(id: string | null) {
    if (id != null) {
      this.id = id;
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
        this.id = this.comic.index.toString();
      });
    }
  }

  randomComic() {
    const currentId = this.id;
    const filteredIndexes = this.indexes.filter(function (e) {
      return e !== parseInt(currentId!);
    });

    const randomIndex =
      filteredIndexes[Math.floor(Math.random() * filteredIndexes.length)];

    this.obtainComicInfo(randomIndex);
    this.router.navigate([`/${randomIndex}`]);
  }
}
