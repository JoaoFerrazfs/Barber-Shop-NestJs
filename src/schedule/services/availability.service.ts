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
import { WorkShift } from '../enums/workshift.enum';

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
          startTime: LessThan(dataEndTime),
          endTime: MoreThan(dataStartTime),
        },
        {
          startTime: LessThanOrEqual(dataEndTime),
          endTime: MoreThan(dataStartTime),
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

  isAvailableForWork(startTime: string, endTime: string): boolean {
    const start = new Date(startTime).getUTCHours();
    const end = new Date(endTime).getUTCHours();

    if (start <= WorkShift.LUNCH_TIME_START || end <= WorkShift.LUCH_TIME_END)
      return false;

    if (start < WorkShift.OPENING) return false;

    return end <= WorkShift.CLOSING;
  }

  generateTimeSlots(
    date: Date,
    startHour: number,
    endHour: number,
    slotDuration: number,
  ): Date[] {
    const slots: Date[] = [];

    const start = dayjs
      .utc(date)
      .set('hour', startHour)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toDate();

    const end = dayjs
      .utc(date)
      .set('hour', endHour)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toDate();

    while (start < end) {
      slots.push(new Date(start));
      start.setMinutes(start.getMinutes() + slotDuration);
    }

    return slots;
  }

  filterAvailableSlots(
    slots: Date[],
    appointments: { date: Date; duration: number }[],
  ): Date[] {
    return slots.filter((slot) => {
      return !appointments.some((appointment) => {
        const appointmentStart = new Date(appointment.date);
        const appointmentEnd = new Date(appointmentStart);
        appointmentEnd.setMinutes(
          appointmentStart.getMinutes() + appointment.duration,
        );

        return slot >= appointmentStart && slot < appointmentEnd;
      });
    });
  }
}
