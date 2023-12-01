import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import { CustomHighlightPlayDirective } from 'src/app/common/directives/custom-highlight-play.directive';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayComponent, CustomHighlightPlayDirective],
    });
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
