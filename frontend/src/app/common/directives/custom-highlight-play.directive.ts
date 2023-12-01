import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appCustomHighlightPlay]',
})
export class CustomHighlightPlayDirective {
  @Input() defaultColor: string = 'blue';
  @Input() highlightColor: string = 'red';
  @HostBinding('style.color') color: string = 'white';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      this.defaultColor
    );
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      this.highlightColor
    );
    this.color = 'yellow';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      this.defaultColor
    );
    this.color = 'white';
  }
}
