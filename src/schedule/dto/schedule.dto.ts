import { IsEnum, IsISO8601, IsNotEmpty, IsUppercase } from 'class-validator';
import { DaysOfTheWeek } from '../enums/daysOfTheWeek.enum';
import { Transform } from 'class-transformer';

export class CreateSchedule {
  @IsUppercase()
  @IsEnum(DaysOfTheWeek, {
    message: `Allowed options: ${DaysOfTheWeek[1]}, ${DaysOfTheWeek[2]}, ${DaysOfTheWeek[3]}, ${DaysOfTheWeek[4]}, ${DaysOfTheWeek[5]}, ${DaysOfTheWeek[6]}, ${DaysOfTheWeek[7]}`,
  })
  dayOfWeek: DaysOfTheWeek;

  @IsISO8601()
  @IsNotEmpty()
  startTime: string;

  @IsISO8601()
  @IsNotEmpty()
  endTime: string;
}
