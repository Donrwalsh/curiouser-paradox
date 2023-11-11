import { FormGroup } from '@angular/forms';

export function FieldMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['fieldsDoNotMatch']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ fieldsDoNotMatch: true });
      control.setErrors({ fieldsDoNotMatch: true });
    } else {
      if (control.hasError('fieldsDoNotMatch')) {
        delete control.errors!['fieldsDoNotMatch'];
        control.updateValueAndValidity();
      }
      if (matchingControl.hasError('fieldsDoNotMatch')) {
        delete matchingControl.errors!['fieldsDoNotMatch'];
        matchingControl.updateValueAndValidity();
      }
    }
  };
}
