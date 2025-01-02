import { IsEnum, IsISO8601, IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { SpendTimeService } from '../enums/spendTimeService.enum';
import { CustomIntervalValidator } from '../decorators/validators/schedule-interval-validator';
import { getMessage } from '../../utils/validators/message.validator';
import { ValidTimeInterval } from '../../utils/validators/hour.validation';

export class CreateScheduleDto {
  @Validate(ValidTimeInterval)
  @IsISO8601()
  @IsNotEmpty()
  @Transform(({ value }) => value.slice(0, 16))
  startTime: string;

  @Validate(ValidTimeInterval)
  @IsISO8601()
  @IsNotEmpty()
  @Transform(({ value }) => value.slice(0, 16))
  endTime: string;

  @IsNotEmpty()
  @Transform(({ value }) => SpendTimeService[value])
  @IsEnum(SpendTimeService, { message: getMessage(SpendTimeService) })
  type: SpendTimeService;

  @Validate(CustomIntervalValidator)
  interval: void;
}
