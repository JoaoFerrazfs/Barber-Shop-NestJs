import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import * as dayjs from 'dayjs';
import { SpendTimeService } from '../../enums/spendTimeService.enum';

@ValidatorConstraint({ name: 'CustomIntervalValidator', async: false })
export class CustomIntervalValidator implements ValidatorConstraintInterface {
  validate(_value: string, args: ValidationArguments): boolean {
    const {
      startTime,
      endTime,
      type,
    }: {
      startTime: string;
      endTime: string;
      type: SpendTimeService;
    } = args.object as never;

    if (!startTime || !endTime || !type) {
      return true;
    }

    const start = dayjs(startTime);
    const end = dayjs(endTime);

    if (!start.isValid() || !end.isValid()) {
      return false;
    }

    const differenceInMinutes = end.diff(start, 'minute');

    return differenceInMinutes === type;
  }

  defaultMessage(args: ValidationArguments): string {
    const { type }: { type: SpendTimeService } = args.object as never;

    if (type === 30) {
      return 'The time interval must be 30 minutes for SIMPLE_SERVICE.';
    }

    if (type === 60) {
      return 'The time interval must be 60 minutes for ELABORATED_SERVICE.';
    }

    return 'Invalid time interval.';
  }
}
