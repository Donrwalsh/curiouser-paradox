import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-comic',
  templateUrl: './specific-comic.component.html',
  styleUrls: ['./specific-comic.component.scss'],
})
export class SpecificComicComponent {
  id: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
