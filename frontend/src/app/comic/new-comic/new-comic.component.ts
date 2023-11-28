import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DataUrl,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
import { ComicDTO } from 'src/app/common/models/comic.model';
import { ComicService } from 'src/app/common/services/comic.service';

@Component({
  selector: 'app-new-comic',
  templateUrl: './new-comic.component.html',
  styleUrls: ['./new-comic.component.scss'],
})
export class NewComicComponent {
  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';

  newComicForm: FormGroup;
  indexes = [];
  seriesNames = [];
  imageSizes = ['Square', 'Tall', 'Wide'];
  isSeries = false;

  constructor(
    private fb: FormBuilder,
    private comicService: ComicService,
    private imageCompress: NgxImageCompressService
  ) {
    this.newComicForm = this.fb.group(
      {
        index: ['', [Validators.required, Validators.min(0)]],
        title: ['', [Validators.required]],
        altText: ['', [Validators.required]],
        comic: ['', [Validators.required]],
        size: ['', [Validators.required]],
        isSeries: [false],
        existingSeries: [''],
        newSeries: [''],
        whichSeries: ['new'],
        publish: [false],
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

  compressFile() {
    //From https://www.npmjs.com/package/ngx-image-compress stackblitz example. Includes useful info in console
    return this.imageCompress
      .uploadFile()
      .then(({ image, orientation, fileName }: UploadResponse) => {
        this.imgResultBeforeCompress = image;
        console.warn('File Name:', fileName);
        console.warn(orientation);
        console.warn(
          `Original: ${image.substring(0, 50)}... (${image.length} characters)`
        );
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

        this.imageCompress
          .compressFile(image, orientation, 75, 50)
          .then((result: DataUrl) => {
            this.imgResultAfterCompress = result;
            console.warn(
              `Compressed: ${result.substring(0, 50)}... (${
                result.length
              } characters)`
            );
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );
            this.controls['comic'].setValue(result);
            this.controls['comic'].markAsDirty();
          });
      });
  }

  clearFile() {
    this.controls['comic'].setValue('');
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
