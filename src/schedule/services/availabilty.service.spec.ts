import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityService } from './availability.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Schedule } from '../schedule.entity';
import {
  scheduleDto,
  scheduleRepositoryMock,
} from '../../../test/mocks/Schedule/schedule.respository.mock';

describe('Availability service test', () => {
  let availabilityService: AvailabilityService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        {
          provide: getRepositoryToken(Schedule),
          useValue: scheduleRepositoryMock,
        },
      ],
    }).compile();

    availabilityService = module.get<AvailabilityService>(AvailabilityService);
  });

  it('Test should return false for unvailable schedule', async () => {
    // Actions
    const actual = await availabilityService.checkSlotAvailability(
      scheduleDto.startTime,
      scheduleDto.endTime,
    );

    // Expectations
    expect(actual).toBeFalsy();
  });

  it('Test should return true for available schedule', async () => {
    // Set
    scheduleRepositoryMock.findOne.mockResolvedValue(null);

    // Actions
    const actual = await availabilityService.checkSlotAvailability(
      scheduleDto.startTime,
      scheduleDto.endTime,
    );

    // Expectations
    expect(actual).toBeTruthy();
  });

  it('Test should verify if is weekend and return false', async () => {
    // Actions
    const actual = await availabilityService.isWeekend(scheduleDto.startTime);

    // Expectations
    expect(actual).toBeFalsy();
  });

  it('Test should verify if is weekend and return true', async () => {
    // Actions
    const actual = await availabilityService.isWeekend(
      '2024-11-24T15:33:00.000Z',
    );

    // Expectations
    expect(actual).toBeTruthy();
  });
});
