import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificComicComponent } from './specific-comic.component';

describe('SpecificComicComponent', () => {
  let component: SpecificComicComponent;
  let fixture: ComponentFixture<SpecificComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificComicComponent]
    });
    fixture = TestBed.createComponent(SpecificComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
