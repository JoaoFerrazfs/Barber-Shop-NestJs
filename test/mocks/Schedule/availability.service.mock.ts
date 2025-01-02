import { AvailabilityService } from '../../../src/schedule/services/availability.service';

export const AvailabilityServiceMock = {
  provide: AvailabilityService,
  useValue: {
    checkSlotAvailability: jest.fn().mockResolvedValue(true),
    isWeekend: jest.fn().mockReturnValue(false),
    isAvailableForWork: jest.fn().mockReturnValue(true),
  },
};
