import { Injectable } from '@nestjs/common';
import {
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Schedule } from '../schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { DaysOfTheWeek } from '../enums/daysOfTheWeek.enum';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async checkSlotAvailability(
    startTime: string,
    endTime: string,
  ): Promise<boolean> {
    const dataStartTime = new Date(startTime);
    const dataEndTime = new Date(endTime);

    const overlappingSchedules = await this.scheduleRepository.findOne({
      where: [
        {
          startTime: LessThanOrEqual(dataEndTime),
          endTime: MoreThan(dataStartTime),
        },
        {
          startTime: LessThan(dataEndTime),
          endTime: MoreThanOrEqual(dataStartTime),
        },
        {
          startTime: MoreThanOrEqual(dataStartTime),
          endTime: LessThanOrEqual(dataEndTime),
        },
      ],
    });

    return !overlappingSchedules;
  }

  isWeekend(startTime: string): boolean {
    const dayOfWeekName = dayjs(startTime).format('dddd').toUpperCase();

    return (
      Number(DaysOfTheWeek[dayOfWeekName]) === Number(DaysOfTheWeek.SUNDAY) ||
      Number(DaysOfTheWeek[dayOfWeekName]) === Number(DaysOfTheWeek.SATURDAY)
    );
  }
}
