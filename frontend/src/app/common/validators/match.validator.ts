import { FormGroup } from '@angular/forms';

export function MatchValidator(
  firstControlName: string,
  secondControlName: string,
  shouldMatch: boolean = true
) {
  return (formGroup: FormGroup) => {
    const firstControl = formGroup.controls[firstControlName];
    const secondControl = formGroup.controls[secondControlName];

    const errorString = shouldMatch ? 'fieldsDoNotMatch' : 'fieldsMatch';

    const comparison = shouldMatch
      ? firstControl.value !== secondControl.value
      : firstControl.value === secondControl.value;

    if (comparison) {
      secondControl.setErrors({ [errorString]: true });
      firstControl.setErrors({ [errorString]: true });
    } else {
      if (firstControl.hasError(errorString)) {
        delete firstControl.errors![errorString];
        firstControl.updateValueAndValidity({ emitEvent: false });
      }
      if (secondControl.hasError(errorString)) {
        delete secondControl.errors![errorString];
        secondControl.updateValueAndValidity({ emitEvent: false });
      }
    }
  };
}
