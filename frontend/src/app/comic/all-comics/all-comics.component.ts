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

  //This awkward bit of code is necessary to avoid the "Not allowed to navigate from top frame to data URL" issue
  nav(base64Url: string, event: Event) {
    event.preventDefault();
    var win = window.open();
    win!.document.write(
      '<iframe src="' +
        base64Url +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  }

  ngOnInit() {
    (this.authService.isSignedIn()
      ? this.comicService.getAllComicsAdmin()
      : this.comicService.getAllComics()
    ).subscribe((data) => {
      this.comics = (data as ComicDTO).payload;
    });

    // if (this.authService.isSignedIn()) {
    //   this.comicService.getAllComicsAdmin().subscribe((data) => {
    //     this.comics = (data as ComicDTO).payload;
    //   });
    // } else {
    //   this.comicService.getAllComics().subscribe((data) => {
    //     this.comics = (data as ComicDTO).payload;
    //   });
    // }
  }
}
