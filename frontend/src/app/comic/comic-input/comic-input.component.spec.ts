import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicInputComponent } from './comic-input.component';

describe('ComicInputComponent', () => {
  let component: ComicInputComponent;
  let fixture: ComponentFixture<ComicInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComicInputComponent]
    });
    fixture = TestBed.createComponent(ComicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
