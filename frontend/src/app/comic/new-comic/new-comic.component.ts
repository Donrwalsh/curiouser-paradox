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
        cardText: [''],
        image: ['', [Validators.required]],
        thumbnail: ['', [Validators.required]],
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

  //diagnostic for quickly filling out the form
  populate() {
    function randomStr(repeat: number = 0): string {
      return repeat === 0
        ? (Math.random() + 1).toString(36).substring(2)
        : randomStr(repeat - 1) + randomStr();
    }

    this.controls['index'].setValue(
      Math.floor((Math.random() + 1) * 999999999999999)
    );
    this.controls['title'].setValue(randomStr());
    this.controls['altText'].setValue(randomStr(5));
    this.controls['cardText'].setValue('Lorem Ipsum? I hardly knowum!');
    this.controls['image'].setValue(
      'data:image/png;base64,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'
    );
    this.controls['thumbnail'].setValue(
      'data:image/png;base64,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'
    );

    Object.keys(this.controls).forEach((key) => {
      this.controls[key].markAsDirty();
    });
    this.controls['size'].setValue('Square');
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
          .compressFile(image, orientation, 75, 75)
          .then((result: DataUrl) => {
            this.imgResultAfterCompress = result;
            console.warn(
              `{Comic} Compressed: ${result.substring(0, 50)}... (${
                result.length
              } characters)`
            );
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );
            this.controls['image'].setValue(result);
            this.controls['image'].markAsDirty();
          });

        this.imageCompress
          .compressFile(image, orientation, 25, 25)
          .then((result: DataUrl) => {
            this.imgResultAfterCompress = result;
            console.warn(
              `{Thumbnail} Compressed: ${result.substring(0, 50)}... (${
                result.length
              } characters)`
            );
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );
            this.controls['thumbnail'].setValue(result);
            this.controls['thumbnail'].markAsDirty();
          });
      });
  }

  clearFile() {
    this.controls['image'].setValue('');
    this.controls['thumbnail'].setValue('');
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
