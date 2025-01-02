import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidTimeInterval', async: false })
export class ValidTimeInterval implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const date = new Date(value);
    const minutes = date.getMinutes();
    return minutes === 0 || minutes === 30;
  }

  defaultMessage(args: ValidationArguments): string {
    return `The time ${args.value} must have minutes as 00 or 30.`;
  }
}
