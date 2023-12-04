import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-comic-input',
  templateUrl: './comic-input.component.html',
  styleUrls: ['./comic-input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class ComicInputComponent {
  @Input({ required: true }) rawFieldName!: string;
  @Input({ required: true }) fieldType!: 'number' | 'text' | 'textarea';
  @Input({ required: true }) control!: FormControl;

  @Input() helpText!: string;

  inputFieldValidity() {
    return {
      'is-valid': this.control.valid && this.control.dirty,
      'is-invalid': this.control.invalid && this.control.dirty,
    };
  }

  transformFieldName(camelCase: boolean = false) {
    const splitFieldName = this.rawFieldName.split(' ');

    return splitFieldName
      .map((word, index) => {
        return (
          (camelCase && index === 0 ? word[0] : word[0].toUpperCase()) +
          word.substring(1)
        );
      })
      .join(camelCase ? '' : ' ');
  }
}
