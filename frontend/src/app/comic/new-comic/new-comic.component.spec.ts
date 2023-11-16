import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComicComponent } from './new-comic.component';

describe('NewComicComponent', () => {
  let component: NewComicComponent;
  let fixture: ComponentFixture<NewComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewComicComponent]
    });
    fixture = TestBed.createComponent(NewComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
