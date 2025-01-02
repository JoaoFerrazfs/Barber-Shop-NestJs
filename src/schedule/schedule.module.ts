import { Module } from '@nestjs/common';
import { ScheduleService } from './services/schedule.service';
import { Schedule } from './schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomIntervalValidator } from './decorators/validators/schedule-interval-validator';
import { ScheduleController } from './controllers/schedule.controller';
import { AvailabilityService } from './services/availability.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, CustomIntervalValidator, AvailabilityService],
  imports: [TypeOrmModule.forFeature([Schedule])],
})
export class ScheduleModule {}
