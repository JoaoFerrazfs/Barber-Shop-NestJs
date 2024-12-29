import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserServiceMock } from '../../../test/mocks/User/user.service.mock';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtServiceMock } from '../../../test/mocks/Auth/jwt.service.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserServiceMock, JwtServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return user data', async () => {
    // Set
    const email = 'test@test.com';
    const password = '12345678';

    // Actions
    const actual = await service.signIn(email, password);

    // Assertions
    expect(actual).toEqual({ access_token: '12345678' });
  });

  it('should return unauthorized', async () => {
    // Set
    const email = 'test@test.com';
    const password = '123456789';

    // Actions
    const actual = service.signIn(email, password);

    // Assertions
    await expect(actual).rejects.toThrow(new UnauthorizedException());
  });

  it('should return not found', async () => {
    // Set
    const email = 'test@test.com';
    const password = '123456789';
    UserServiceMock.useValue.getUserByCredentials.mockResolvedValue(null);

    // Actions
    const actual = service.signIn(email, password);

    // Assertions
    await expect(actual).rejects.toThrow(new NotFoundException());
  });
});
