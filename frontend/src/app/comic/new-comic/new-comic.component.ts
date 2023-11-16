import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ComicDTO } from 'src/app/comic/comic.model';
import { AuthService } from 'src/app/common/services/auth.service';
import { ComicService } from 'src/app/common/services/comic.service';
import { FieldMatchValidator } from 'src/app/common/validators/field-match.validator';
import { FieldsDontMatchValidator } from 'src/app/common/validators/fields-dont-match.validator';

@Component({
  selector: 'app-new-comic',
  templateUrl: './new-comic.component.html',
  styleUrls: ['./new-comic.component.scss'],
})
export class NewComicComponent {
  newComicForm: FormGroup;
  indexes = [];

  constructor(private fb: FormBuilder, private comicService: ComicService) {
    this.newComicForm = this.fb.group(
      {
        index: ['', [Validators.required]],
        // newPasswordOne: ['', Validators.required],
        // newPasswordTwo: ['', Validators.required],
      },
      {
        //   validators: [
        //     FieldMatchValidator('newPasswordOne', 'newPasswordTwo'),
        //     FieldsDontMatchValidator('oldPassword', 'newPasswordOne'),
        //   ],
      } as AbstractControlOptions
    );
  }

  ngOnInit() {
    this.comicService.getIndexes().subscribe((data) => {
      this.indexes = (data as ComicDTO).payload;
      this.newComicForm
        .get('index')
        ?.addValidators(this.notInArrayValidator(this.indexes));
    });
  }

  get controls() {
    return this.newComicForm.controls;
  }

  submit() {
    console.log(this.controls['index'].invalid);
    Object.keys(this.controls).forEach((key) => {
      this.controls[key].markAsDirty();
    });

    console.log(this.newComicForm.value);
    console.log(this.newComicForm.controls['index']);
  }

  notInArrayValidator(array: any[]) {
    console.log(array);

    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== null && array.includes(control.value)) {
        return {
          indexTaken: true,
        };
      } else {
        return null;
      }
    };
  }
}
