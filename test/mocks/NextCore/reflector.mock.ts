import { Reflector } from '@nestjs/core';

export const ReflectorContextMock = {
  provide: Reflector,
  useValue: {
    getAllAndOverride: jest.fn().mockReturnValue(['admin']),
  },
};
