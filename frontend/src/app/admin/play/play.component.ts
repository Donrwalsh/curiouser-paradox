import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
  //https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  //I prefer the non-null assertion operator rather than removing strict type checking across the whole project
  @ViewChild('aTextInputToPlayWith') textInput!: ElementRef;

  viewChildPlay() {
    console.log(this.textInput);
    console.log(this.textInput.nativeElement);
    console.log(this.textInput.nativeElement.value);
    this.textInput.nativeElement.classList.add(
      'some-class-that-does-something'
    );
  }
}
