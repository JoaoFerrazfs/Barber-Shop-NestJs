import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateSchedule } from '../dto/schedule.dto';
import { ScheduleService } from '../services/schedule.service';
import { AvailabilityService } from '../services/availability.service';

@Controller('api/schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly availabilityService: AvailabilityService,
  ) {}
  @Get()
  async schedules() {
    return { data: await this.scheduleService.getAvailableDays() };
  }

  @Post('create')
  async schedule(@Body() data: CreateSchedule) {
    if (
      !this.availabilityService.isAvailableForWork(data.startTime, data.endTime)
    ) {
      throw new HttpException(
        'fora do horario de trabalho',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (this.availabilityService.isWeekend(data.startTime)) {
      throw new HttpException(
        'fim de semana to de folga',
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
        'Horario não disponivel',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const result = await this.scheduleService.createSchedule(data);

    return { data: result };
  }
}
