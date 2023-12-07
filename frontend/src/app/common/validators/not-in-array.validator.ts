import { AbstractControl } from '@angular/forms';

export function notInArrayValidator(array: any[]) {
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
