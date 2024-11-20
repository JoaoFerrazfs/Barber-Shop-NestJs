import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateSchedule } from './dto/schedule.dto';
import { DaysOfTheWeek } from './enums/daysOfTheWeek.enum';

@Controller('api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  @Get()
  async available() {
    return await this.scheduleService.getAvailableDays();
  }

  @Post('create')
  async schedule(@Body() data: CreateSchedule) {
    if (
      Number(DaysOfTheWeek[data.dayOfWeek]) === Number(DaysOfTheWeek.SUNDAY) ||
      Number(DaysOfTheWeek[data.dayOfWeek]) === Number(DaysOfTheWeek.SATURDAY)
    ) {
      throw new HttpException(
        'Some error ocurred',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const result = await this.scheduleService.createSchedule(data);

    return { data: result };
  }
}
