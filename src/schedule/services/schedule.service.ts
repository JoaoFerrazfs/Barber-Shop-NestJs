import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchedule } from '../dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  async getAvailableDays() {
    return await this.scheduleRepository.find();
  }
  async createSchedule(data: CreateSchedule) {
    const transformedData = {
      type: String(data.type),
    };

    return await this.scheduleRepository.save({
      ...data,
      ...transformedData,
    });
  }
}
