import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComicsComponent } from './all-comics.component';
import { HttpClientModule } from '@angular/common/http';

describe('AllComicsComponent', () => {
  let component: AllComicsComponent;
  let fixture: ComponentFixture<AllComicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllComicsComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(AllComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
