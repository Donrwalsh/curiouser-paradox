import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestComicComponent } from './latest-comic.component';

describe('LatestComicComponent', () => {
  let component: LatestComicComponent;
  let fixture: ComponentFixture<LatestComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatestComicComponent]
    });
    fixture = TestBed.createComponent(LatestComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
