import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  equals,
} from 'class-validator';

export const Match =
  <T>(property: keyof T, options?: ValidationOptions) =>
  (object: any, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: MatchConstraint,
    });

export const NotMatch =
  <T>(property: keyof T, options?: ValidationOptions) =>
  (object: any, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: NotMatchConstraint,
    });

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const [propertyNameToCompare] = args?.constraints || [];
    const propertyValue = (args?.object as any)[propertyNameToCompare];
    return equals(value, propertyValue);
  }

  defaultMessage(args?: ValidationArguments): string {
    const [propertyNameToCompare] = args?.constraints || [];

    return `${args?.property} should match the ${propertyNameToCompare}`;
  }
}

@ValidatorConstraint({ name: 'NotMatch' })
export class NotMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const [propertyNameToCompare] = args?.constraints || [];
    const propertyValue = (args?.object as any)[propertyNameToCompare];
    return !equals(value, propertyValue);
  }

  defaultMessage(args?: ValidationArguments): string {
    const [propertyNameToCompare] = args?.constraints || [];

    return `${args?.property} should not match the ${propertyNameToCompare}`;
  }
}
