import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ComicDTO } from 'src/app/common/models/comic.model';
import { ComicService } from 'src/app/common/services/comic.service';

@Component({
  selector: 'app-new-comic',
  templateUrl: './new-comic.component.html',
  styleUrls: ['./new-comic.component.scss'],
})
export class NewComicComponent {
  newComicForm: FormGroup;
  indexes = [];
  seriesNames = [];

  constructor(private fb: FormBuilder, private comicService: ComicService) {
    this.newComicForm = this.fb.group(
      {
        index: ['', [Validators.required, Validators.min(0)]],
        title: ['', [Validators.required]],
        isSeries: [false],
      },
      {} as AbstractControlOptions
    );
  }

  ngOnInit() {
    this.comicService.getIndexesAdmin().subscribe((data) => {
      this.indexes = (data as ComicDTO).payload;
      this.newComicForm
        .get('index')
        ?.addValidators(this.notInArrayValidator(this.indexes));
    });

    this.comicService.getSeriesNamesAdmin().subscribe((data) => {
      this.seriesNames = (data as ComicDTO).payload;
    });
  }

  get controls() {
    return this.newComicForm.controls;
  }

  inputFieldValidity(fieldName: string) {
    return {
      'is-valid':
        this.controls[fieldName].valid && this.controls[fieldName].dirty,
      'is-invalid':
        this.controls[fieldName].invalid && this.controls[fieldName].dirty,
    };
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
