import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComicComponent } from './main-comic.component';

describe('MainComicComponent', () => {
  let component: MainComicComponent;
  let fixture: ComponentFixture<MainComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComicComponent]
    });
    fixture = TestBed.createComponent(MainComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
