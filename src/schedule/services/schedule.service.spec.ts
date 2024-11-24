import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Schedule } from '../schedule.entity';
import {
  schedule,
  scheduleDto,
  scheduleRepositoryMock,
} from '../../../test/mocks/Schedule/schedule.respository.mock';
import { ScheduleService } from './schedule.service';

describe('Schedule service test', () => {
  let scheduleService: ScheduleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: getRepositoryToken(Schedule),
          useValue: scheduleRepositoryMock,
        },
      ],
    }).compile();

    scheduleService = module.get<ScheduleService>(ScheduleService);
  });

  it('should get schedules', async () => {
    // Action
    const actual = await scheduleService.getAvailableDays();

    // Expectations
    expect(actual).toEqual([schedule]);
  });

  it('should create schedule', async () => {
    // Action
    const actual = await scheduleService.createSchedule(scheduleDto);

    // Expectations
    expect(actual).toEqual(schedule);
  });
});
