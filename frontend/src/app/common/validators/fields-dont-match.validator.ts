import { FormGroup } from '@angular/forms';

export function FieldsDontMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['fieldsMatch']) {
      return;
    }
    if (control.value === matchingControl.value) {
      control.setErrors({ fieldsMatch: true });
      matchingControl.setErrors({ fieldsMatch: true });
    } else {
      if (control.hasError('fieldsMatch')) {
        delete control.errors!['fieldsMatch'];
        control.updateValueAndValidity();
      }
      if (matchingControl.hasError('fieldsMatch')) {
        delete matchingControl.errors!['fieldsMatch'];
        matchingControl.updateValueAndValidity();
      }
    }
  };
}
