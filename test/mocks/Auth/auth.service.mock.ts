import { AuthService } from '../../../src/auth/services/auth.service';

export const AuthServiceMock = {
  provide: AuthService,
  useValue: {
    signIn: jest.fn().mockResolvedValue(['user-login-data']),
  },
};
