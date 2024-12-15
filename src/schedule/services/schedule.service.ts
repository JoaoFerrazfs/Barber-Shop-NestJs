import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from '../dto/schedule.dto';
import { WorkShift } from '../enums/workshift.enum';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  public async getSchedules() {
    return await this.scheduleRepository.find();
  }

  public async createSchedule(data: CreateScheduleDto) {
    const transformedData = {
      type: String(data.type),
    };

    return await this.scheduleRepository.save({
      ...data,
      ...transformedData,
    });
  }

  public async getAppointmentsByPeriod(daysToCheck: number = 1) {
    const allSchedules = await this.getSchedules();
    const today = this.getStartOfDay();
    const availableTimes = [];

    for (let dayOffset = 0; dayOffset <= daysToCheck; dayOffset++) {
      const currentDayStart = this.getCurrentDayStart(today, dayOffset);
      const daySchedules = this.getDaySchedules(allSchedules, currentDayStart);
      const { dayWorkingHoursStart, dayWorkingHoursEnd, lunchStart, lunchEnd } =
        this.buildWorkingHours(currentDayStart);
      const availableDayTimes = this.getAvailableTimes(
        this.sortSchedules(daySchedules),
        currentDayStart,
        dayWorkingHoursStart,
        dayWorkingHoursEnd,
        lunchStart,
        lunchEnd,
      );
      availableTimes.push(...availableDayTimes);
    }

    return availableTimes;
  }

  private getCurrentDayStart(today: Date, dayOffset: number): Date {
    const currentDayStart = new Date(today);
    currentDayStart.setUTCDate(today.getUTCDate() + dayOffset);
    return currentDayStart;
  }

  private getDaySchedules(
    allSchedules: any[],
    currentDayStart: Date,
  ): { start: Date; end: Date }[] {
    return allSchedules
      .map((interval) => ({
        start: new Date(interval.startTime),
        end: new Date(interval.endTime),
      }))
      .filter(
        ({ start, end }) =>
          start.toISOString().slice(0, 10) ===
            currentDayStart.toISOString().slice(0, 10) ||
          end.toISOString().slice(0, 10) ===
            currentDayStart.toISOString().slice(0, 10),
      );
  }

  private sortSchedules(
    daySchedules: { start: Date; end: Date }[],
  ): { start: Date; end: Date }[] {
    return daySchedules.sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  private getAvailableTimes(
    sortedOccupiedTimes: { start: Date; end: Date }[],
    currentDayStart: Date,
    dayWorkingHoursStart: Date,
    dayWorkingHoursEnd: Date,
    lunchStart: Date,
    lunchEnd: Date,
  ): { day: string; start: string; end: string }[] {
    const availableTimes = [];
    let lastEndTime = dayWorkingHoursStart;

    for (const { start, end } of sortedOccupiedTimes) {
      if (lastEndTime < start) {
        this.addAvailableTimeBeforeOccupiedInterval(
          availableTimes,
          lastEndTime,
          start,
          currentDayStart,
          lunchStart,
          lunchEnd,
        );
      }

      lastEndTime = end > lastEndTime ? end : lastEndTime;
    }

    this.addAvailableTimeAfterOccupiedIntervals(
      availableTimes,
      lastEndTime,
      currentDayStart,
      lunchStart,
      lunchEnd,
      dayWorkingHoursEnd,
    );

    return availableTimes;
  }

  private addAvailableTimeBeforeOccupiedInterval(
    availableTimes: { day: string; start: string; end: string }[],
    lastEndTime: Date,
    start: Date,
    currentDayStart: Date,
    lunchStart: Date,
    lunchEnd: Date,
  ): void {
    // If there is no availability before the occupied interval, it does nothing.
    if (lastEndTime >= start) return;

    // If the occupied interval happens after lunch time.
    if (lastEndTime < lunchStart && start > lunchStart) {
      availableTimes.push({
        day: currentDayStart.toISOString().slice(0, 10),
        start: lastEndTime.toISOString(),
        end: lunchStart.toISOString(),
      });

      // Add the interval after ou before oh lunch, if there necessity
      if (lunchEnd < start) {
        availableTimes.push({
          day: currentDayStart.toISOString().slice(0, 10),
          start: lunchEnd.toISOString(),
          end: start.toISOString(),
        });
      }
      return;
    }

    // If the occupied interval does not coincide with lunch time.
    if (lastEndTime >= lunchEnd || start <= lunchStart) {
      availableTimes.push({
        day: currentDayStart.toISOString().slice(0, 10),
        start: lastEndTime.toISOString(),
        end: start.toISOString(),
      });
    }
  }

  private addAvailableTimeAfterOccupiedIntervals(
    availableTimes: { day: string; start: string; end: string }[],
    lastEndTime: Date,
    currentDayStart: Date,
    lunchStart: Date,
    lunchEnd: Date,
    dayWorkingHoursEnd: Date,
  ): void {
    // If there is no more availability after the last interval, do nothing.
    if (lastEndTime >= dayWorkingHoursEnd) return;

    // If the last interval ends before lunchtime.
    if (lastEndTime < lunchStart) {
      availableTimes.push({
        day: currentDayStart.toISOString().slice(0, 10),
        start: lastEndTime.toISOString(),
        end: lunchStart.toISOString(),
      });
      availableTimes.push({
        day: currentDayStart.toISOString().slice(0, 10),
        start: lunchEnd.toISOString(),
        end: dayWorkingHoursEnd.toISOString(),
      });
      return;
    }

    // If the last interval ends after lunchtime.
    if (lastEndTime >= lunchEnd) {
      availableTimes.push({
        day: currentDayStart.toISOString().slice(0, 10),
        start: lastEndTime.toISOString(),
        end: dayWorkingHoursEnd.toISOString(),
      });
    }
  }

  private buildWorkingHours(currentDayStart: Date): {
    dayWorkingHoursStart: Date;
    dayWorkingHoursEnd: Date;
    lunchStart: Date;
    lunchEnd: Date;
  } {
    currentDayStart.setUTCHours(WorkShift.OPENING);
    const dayWorkingHoursStart = new Date(currentDayStart);

    currentDayStart.setUTCHours(WorkShift.CLOSING);
    const dayWorkingHoursEnd = new Date(currentDayStart);

    currentDayStart.setUTCHours(WorkShift.LUNCH_TIME_START);
    const lunchStart = new Date(currentDayStart);

    currentDayStart.setUTCHours(WorkShift.LUCH_TIME_END);
    const lunchEnd = new Date(currentDayStart);

    return { dayWorkingHoursStart, dayWorkingHoursEnd, lunchStart, lunchEnd };
  }

  private getStartOfDay(): Date {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return today;
  }
}
