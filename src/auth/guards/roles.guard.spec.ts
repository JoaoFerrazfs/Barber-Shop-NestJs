import { Test, TestingModule } from '@nestjs/testing';
import { executionContextMock } from '../../../test/mocks/NextCore/executionContext.mock';
import { RolesGuard } from './roles.guard';
import { ReflectorContextMock } from '../../../test/mocks/NextCore/reflector.mock';

describe('Role Guard', () => {
  let rolesGuard: RolesGuard;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard, ReflectorContextMock],
    }).compile();

    rolesGuard = module.get(RolesGuard);
  });

  it('should return true for a valid and authorized user type', async () => {
    // Actions
    const actual = rolesGuard.canActivate(
      executionContextMock({
        headers: {
          authorization: 'Bearer 12345678',
        },
        user: { type: 'admin' },
      }),
    );

    // Assertions
    expect(actual).toBeTruthy();
  });

  it('should return true for a valid and authorized user type', async () => {
    // Actions
    const actual = rolesGuard.canActivate(
      executionContextMock({
        headers: {
          authorization: 'Bearer 12345678',
        },
        user: { type: 'something' },
      }),
    );

    // Assertions
    expect(actual).toBeFalsy();
  });

  it('should return true for a route without authorization roles', async () => {
    // Expectations
    ReflectorContextMock.useValue.getAllAndOverride.mockReturnValue(undefined);

    // Actions
    const actual = rolesGuard.canActivate(
      executionContextMock({
        headers: {
          authorization: 'Bearer 12345678',
        },
        user: { type: 'something' },
      }),
    );

    // Assertions
    expect(actual).toBeTruthy();
  });
});
