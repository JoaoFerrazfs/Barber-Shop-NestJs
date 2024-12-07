import { ScheduleService } from '../../../src/schedule/services/schedule.service';

export const ScheduleServiceMock = {
  provide: ScheduleService,
  useValue: {
    createSchedule: jest.fn().mockReturnValue(['schedules']),
    getSchedules: jest.fn().mockReturnValue(['availableDays']),
  },
};
