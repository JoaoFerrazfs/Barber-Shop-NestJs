import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'CustomIntervalValidator', async: false })
export class CustomIntervalValidator implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments): boolean {
    const { startTime, endTime, type } = args.object as any;

    if (!startTime || !endTime || !type) {
      return true;
    }

    const start = dayjs(startTime);
    const end = dayjs(endTime);

    if (!start.isValid() || !end.isValid()) {
      return false;
    }

    const differenceInMinutes = end.diff(start, 'minute');

    if (differenceInMinutes !== type) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const { type } = args.object as any;

    if (type === 30) {
      return 'The time interval must be 30 minutes for SIMPLE_SERVICE.';
    }

    if (type === 60) {
      return 'The time interval must be 60 minutes for ELABORATED_SERVICE.';
    }

    return 'Invalid time interval.';
  }
}
