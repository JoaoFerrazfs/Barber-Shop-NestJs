import { ScheduleService } from '../../../src/schedule/services/schedule.service';

export const ScheduleServiceMock = {
  provide: ScheduleService,
  useValue: {
    getAvailableDays: jest.fn().mockResolvedValue(['availableDays']),
    createSchedule: jest.fn().mockReturnValue(['schedules']),
  },
};
