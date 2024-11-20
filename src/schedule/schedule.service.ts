import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchedule } from './dto/schedule.dto';
import { DaysOfTheWeek } from './enums/daysOfTheWeek.enum';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  async getAvailableDays() {
    return await this.scheduleRepository.find();
  }
  async createSchedule(data: CreateSchedule): Promise<Schedule> {
    const schedule = await this.scheduleRepository.create({
      ...data,
      ...{ dayOfWeek: Number(DaysOfTheWeek[data.dayOfWeek]) },
    });

    return await this.scheduleRepository.save(schedule);
  }
}
