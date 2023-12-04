import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicInputComponent } from './comic-input.component';
import { FormControl } from '@angular/forms';

describe('ComicInputComponent', () => {
  let component: ComicInputComponent;
  let fixture: ComponentFixture<ComicInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComicInputComponent],
    });
    fixture = TestBed.createComponent(ComicInputComponent);
    component = fixture.componentInstance;
    component.rawFieldName = 'test';
    component.control = new FormControl('test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
