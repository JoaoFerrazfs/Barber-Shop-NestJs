import { AuthGuard } from './auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtServiceMock } from '../../../test/mocks/Auth/jwt.service.mock';
import { executionContextMock } from '../../../test/mocks/NextCore/executionContext.mock';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtServiceMock, AuthGuard],
    }).compile();

    authGuard = module.get(AuthGuard);
  });

  it('should get and set jwt in request and return true', async () => {
    // Actions
    const actual = authGuard.canActivate(
      executionContextMock({
        headers: {
          authorization: 'Bearer 12345678',
        },
      }),
    );

    // Assertions
    expect(actual).toBeTruthy();
  });

  it('should dont get nonexistent JWT', async () => {
    // Actions
    const actual = authGuard.canActivate(
      executionContextMock({
        headers: {},
      }),
    );

    // Assertions
    await expect(actual).rejects.toThrow(
      new UnauthorizedException('Without JWT Token'),
    );
  });

  it('should dont get invalid JWT', async () => {
    // Expectations
    JwtServiceMock.useValue.verifyAsync.mockRejectedValue(
      new Error('Generic error'),
    );

    // Actions
    const actual = authGuard.canActivate(
      executionContextMock({
        headers: { authorization: 'Bearer invalid' },
      }),
    );

    // Assertions
    await expect(actual).rejects.toThrow(
      new UnauthorizedException('Invalid JWT Token'),
    );
  });
});
