import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NewComicComponent } from './new-comic.component';
import { ComicInputComponent } from 'src/app/comic/comic-input/comic-input.component';
import { FormControlPipe } from 'src/app/common/pipes/form-control';

describe('NewComicComponent', () => {
  let component: NewComicComponent;
  let fixture: ComponentFixture<NewComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewComicComponent, ComicInputComponent, FormControlPipe],
      imports: [
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(NewComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
