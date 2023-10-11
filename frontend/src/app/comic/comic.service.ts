import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  host = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getLatest() {
    return this.http.get(`api/comics/latest`).pipe(map((res) => res));
  }

  getSpecific(id: string) {
    return this.http.get(`api/comics/${id}`).pipe(map((res) => res));
  }
}
