import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainHeaderComponent } from './main-header.component';

describe('MainHeaderComponent', () => {
  let component: MainHeaderComponent;
  let fixture: ComponentFixture<MainHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainHeaderComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(MainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
