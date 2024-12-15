import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateScheduleDto } from '../dto/schedule.dto';
import { ScheduleService } from '../services/schedule.service';
import { AvailabilityService } from '../services/availability.service';
import {
  ApiCreateScheduleDoc,
  ApiGetAvailableSchedulesDoc,
  ApiGetSchedulesDoc,
} from '../oas/schedule.oas';

@Controller('api/schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly availabilityService: AvailabilityService,
  ) {}
  @ApiGetSchedulesDoc()
  @Get()
  public async schedules() {
    return { data: await this.scheduleService.getSchedules() };
  }

  @ApiCreateScheduleDoc()
  @Post('create')
  public async schedule(@Body() data: CreateScheduleDto) {
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
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const result = await this.scheduleService.createSchedule(data);

    return { data: result };
  }

  @ApiGetAvailableSchedulesDoc()
  @Get('available')
  public async available() {
    return { data: await this.scheduleService.getAppointmentsByPeriod() };
  }
}
