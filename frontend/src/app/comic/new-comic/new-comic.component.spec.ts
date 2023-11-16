import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComicComponent } from './new-comic.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('NewComicComponent', () => {
  let component: NewComicComponent;
  let fixture: ComponentFixture<NewComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewComicComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(NewComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
