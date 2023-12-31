import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminComponent } from './main-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from 'src/app/admin/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('MainAdminComponent', () => {
  let component: MainAdminComponent;
  let fixture: ComponentFixture<MainAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAdminComponent, LoginComponent],
      imports: [
        ToastrModule.forRoot({
          positionClass: 'toast-top-right',
        }),
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(MainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
