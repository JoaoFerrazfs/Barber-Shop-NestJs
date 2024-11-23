import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateSchedule } from '../dto/schedule.dto';
import { DaysOfTheWeek } from '../enums/daysOfTheWeek.enum';
import { ScheduleService } from '../services/schedule.service';
import { AvailabilityService } from '../services/availability.service';

import * as dayjs from 'dayjs';

@Controller('api/schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly availabilityService: AvailabilityService,
  ) {}
  @Get()
  async available() {
    return await this.scheduleService.getAvailableDays();
  }

  @Post('create')
  async schedule(@Body() data: CreateSchedule) {
    const dayOfWeekName = dayjs(data.startTime).format('dddd').toUpperCase();

    if (this.availabilityService.isWeekend(data.startTime)) {
      throw new HttpException(
        'Some error ocurred',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (
      !(await this.availabilityService.checkSlotAvailability(
        data.startTime,
        data.endTime,
      ))
    ) {
      throw new HttpException(
        'Some error ocurred',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const result = await this.scheduleService.createSchedule(data);

    return { data: result };
  }
}
