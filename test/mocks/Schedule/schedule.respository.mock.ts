import { CreateSchedule } from '../../../src/schedule/dto/schedule.dto';
import { SpendTimeService } from '../../../src/schedule/enums/spendTimeService.enum';
import { Schedule } from '../../../src/schedule/schedule.entity';

export const schedule: Schedule = {
  id: 1,
  startTime: new Date('2024-11-21T15:30:00.000Z'),
  endTime: new Date('2024-11-21T16:03:00.000Z'),
  type: 'SIMPLE_SERVICE',
  createdAt: new Date('2024-11-23 17:59:24.641452'),
  updatedAt: new Date('2024-11-23 17:59:24.641452'),
};

export const schedule2: Schedule = {
  id: 1,
  startTime: new Date('2024-11-21T10:30:00.000Z'),
  endTime: new Date('2024-11-21T11:03:00.000Z'),
  type: 'SIMPLE_SERVICE',
  createdAt: new Date('2024-11-23 17:59:24.641452'),
  updatedAt: new Date('2024-11-23 17:59:24.641452'),
};

export const schedule3: Schedule = {
  id: 1,
  startTime: new Date('2024-11-21T17:30:00.000Z'),
  endTime: new Date('2024-11-21T18:00:00.000Z'),
  type: 'SIMPLE_SERVICE',
  createdAt: new Date('2024-11-23 17:59:24.641452'),
  updatedAt: new Date('2024-11-23 17:59:24.641452'),
};

export const scheduleDto: CreateSchedule = {
  startTime: '2024-11-21T15:33:00.000Z',
  endTime: '2024-11-21T16:03:00.000Z',
  type: SpendTimeService.SIMPLE_SERVICE,
  interval: undefined,
};

export const scheduleRepositoryMock = {
  find: jest.fn().mockResolvedValue([schedule]),
  findOne: jest.fn().mockResolvedValue(schedule),
  findOneBy: jest.fn().mockResolvedValue(schedule),
  create: jest.fn().mockResolvedValue(schedule),
  save: jest.fn().mockResolvedValue(schedule),
  update: jest.fn().mockResolvedValue({ affected: 1 }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};
