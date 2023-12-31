import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ComicDTO } from 'src/app/common/models/comic.model';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient) {}

  createComic(createDTO: ComicDTO) {
    return this.http
      .post(`${environment.apiHost}/admin/comics/create`, { ...createDTO })
      .pipe(tap((data: any) => console.log(data)));
  }

  getAllComics() {
    return this.http
      .get(`${environment.apiHost}/comics/all`)
      .pipe(map((res) => res));
  }

  getAllComicsAdmin() {
    return this.http
      .get(`${environment.apiHost}/admin/comics/all`)
      .pipe(map((res) => res));
  }

  getIndexes() {
    return this.http
      .get(`${environment.apiHost}/comics/indexes`)
      .pipe(map((res) => res));
  }

  getIndexesAdmin() {
    return this.http
      .get(`${environment.apiHost}/admin/comics/indexes`)
      .pipe(map((res) => res));
  }

  getSeriesNamesAdmin() {
    return this.http
      .get(`${environment.apiHost}/admin/comics/series-names`)
      .pipe(map((res) => res));
  }

  getLatest() {
    return this.http
      .get(`${environment.apiHost}/comics/latest`)
      .pipe(map((res) => res));
  }

  getSpecific(id: string) {
    return this.http
      .get(`${environment.apiHost}/comics/${id}`)
      .pipe(map((res) => res));
  }
}
