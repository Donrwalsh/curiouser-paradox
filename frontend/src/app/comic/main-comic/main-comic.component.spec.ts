import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComicComponent } from './main-comic.component';
import { HttpClientModule } from '@angular/common/http';

describe('MainComicComponent', () => {
  let component: MainComicComponent;
  let fixture: ComponentFixture<MainComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComicComponent],
      imports: [RouterTestingModule, HttpClientModule],
    });
    fixture = TestBed.createComponent(MainComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
