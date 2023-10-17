import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(private http: HttpClient) {}

  getIndexes() {
    return this.http
      .get(`${environment.apiHost}/comics/indexes`)
      .pipe(map((res) => res));
  }

  getLatest() {
    console.log(environment.apiHost);
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
