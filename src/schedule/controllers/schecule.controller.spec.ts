import { Test } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { AvailabilityServiceMock } from '../../../test/mocks/Schedule/availability.service.mock';
import { ScheduleServiceMock } from '../../../test/mocks/Schedule/schedule.service.mock';
import { CreateSchedule } from '../dto/schedule.dto';
import { SpendTimeService } from '../enums/spendTimeService.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ScheduleController', () => {
  let scheduleController: ScheduleController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [ScheduleServiceMock, AvailabilityServiceMock],
    }).compile();

    scheduleController = module.get<ScheduleController>(ScheduleController);
  });

  test('Should return available schedule', async () => {
    // Actions
    const actual = await scheduleController.available();

    // Assertions
    expect(actual).toStrictEqual({ data: ['availableDays'] });
  });

  test('Should schedule a service', async () => {
    // Set
    const data: CreateSchedule = {
      type: SpendTimeService.SIMPLE_SERVICE,
      startTime: '2024-11-21T15:33:00.000Z',
      endTime: '2024-11-21T16:03:00.000Z',
      interval: undefined,
    };

    // Actions
    const actual = await scheduleController.schedule(data);

    // Assertions
    expect(actual).toStrictEqual({ data: ['schedules'] });
  });

  test('Should not schedule a service in weekends', async () => {
    // Set
    const data: CreateSchedule = {
      type: SpendTimeService.SIMPLE_SERVICE,
      startTime: '2024-11-21T15:33:00.000Z',
      endTime: '2024-11-21T16:03:00.000Z',
      interval: undefined,
    };

    AvailabilityServiceMock.useValue.isWeekend.mockReturnValue(true);

    // Actions
    const actual = scheduleController.schedule(data);

    // Assertions
    await expect(actual).rejects.toThrow(
      new HttpException(
        'fim de semana to de folga',
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
    );
  });

  test('Should not schedule a service out of avaiable work shift', async () => {
    // Set
    const data: CreateSchedule = {
      type: SpendTimeService.SIMPLE_SERVICE,
      startTime: '2024-11-21T15:33:00.000Z',
      endTime: '2024-11-21T16:03:00.000Z',
      interval: undefined,
    };

    AvailabilityServiceMock.useValue.isAvailableForWork.mockReturnValue(false);

    // Actions
    const actual = scheduleController.schedule(data);

    // Assertions
    await expect(actual).rejects.toThrow(
      new HttpException(
        'fora do horario de trabalho',
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
    );
  });

  test('Should not schedule a service with not slots able', async () => {
    // Set
    const data: CreateSchedule = {
      type: SpendTimeService.SIMPLE_SERVICE,
      startTime: '2024-11-21T15:33:00.000Z',
      endTime: '2024-11-21T16:03:00.000Z',
      interval: undefined,
    };

    AvailabilityServiceMock.useValue.isAvailableForWork.mockReturnValue(true);
    AvailabilityServiceMock.useValue.isWeekend.mockReturnValue(false);
    AvailabilityServiceMock.useValue.checkSlotAvailability.mockResolvedValue(
      false,
    );

    // Actions
    const actual = scheduleController.schedule(data);

    // Assertions
    await expect(actual).rejects.toThrow(
      new HttpException(
        'Horario não disponivel',
        HttpStatus.SERVICE_UNAVAILABLE,
      ),
    );
  });
});
