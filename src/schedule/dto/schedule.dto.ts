import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsUppercase,
  Validate,
} from 'class-validator';
import dayjs from 'dayjs';
import { DaysOfTheWeek } from '../enums/daysOfTheWeek.enum';
import { Transform } from 'class-transformer';
import { SpendTimeService } from '../enums/spendTimeService.enum';
import { CustomIntervalValidator } from '../decorators/validators/schedule-interval-validator';
import { getMessage } from '../../utils/validators/message.validator';

export class CreateSchedule {
  @IsISO8601()
  @IsNotEmpty()
  startTime: string;

  @IsISO8601()
  @IsNotEmpty()
  endTime: string;

  @IsNotEmpty()
  @Transform(({ value }) => SpendTimeService[value])
  @IsEnum(SpendTimeService, { message: getMessage(SpendTimeService) })
  type: SpendTimeService;

  @Validate(CustomIntervalValidator)
  interval: void;
}
