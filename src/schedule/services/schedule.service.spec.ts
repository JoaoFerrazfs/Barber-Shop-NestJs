import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Schedule } from '../schedule.entity';
import {
  schedule,
  schedule2,
  schedule3,
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

    // Set Date
    jest.useFakeTimers();
    const mockDate = new Date('2024-11-21T10:30:00.000Z');
    jest.setSystemTime(mockDate);
  });

  it('should get schedules', async () => {
    // Action
    const actual = await scheduleService.getSchedules();

    // Expectations
    expect(actual).toEqual([schedule]);
  });

  it('should create schedule', async () => {
    // Action
    const actual = await scheduleService.createSchedule(scheduleDto);

    // Expectations
    expect(actual).toEqual(schedule);
  });

  it('should get all available schedules', async () => {
    //Set

    scheduleRepositoryMock.find.mockResolvedValue([
      schedule,
      schedule2,
      schedule3,
    ]);

    const expected = [
      {
        day: '2024-11-21',
        start: '2024-11-21T08:00:00.000Z',
        end: '2024-11-21T10:30:00.000Z',
      },
      {
        day: '2024-11-21',
        start: '2024-11-21T11:03:00.000Z',
        end: '2024-11-21T12:00:00.000Z',
      },
      {
        day: '2024-11-21',
        start: '2024-11-21T13:00:00.000Z',
        end: '2024-11-21T15:30:00.000Z',
      },
      {
        day: '2024-11-21',
        start: '2024-11-21T16:03:00.000Z',
        end: '2024-11-21T17:30:00.000Z',
      },
      {
        day: '2024-11-22',
        start: '2024-11-22T08:00:00.000Z',
        end: '2024-11-22T12:00:00.000Z',
      },
      {
        day: '2024-11-22',
        start: '2024-11-22T13:00:00.000Z',
        end: '2024-11-22T18:00:00.000Z',
      },
    ];

    // Action
    const actual = await scheduleService.getAppointmentsByPeriod(1);

    // Expectations
    expect(actual).toEqual(expected);
  });
});
