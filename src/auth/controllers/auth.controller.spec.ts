import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthServiceMock } from '../../../test/mocks/Auth/auth.service.mock';
import { AuthLoginDto } from '../dto/auth.login.dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceMock],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', async () => {
    // Set
    const authLoginDto = {
      email: 'test@test.com',
      password: '12345678',
    } as AuthLoginDto;

    // Actions
    const actual = await controller.signIn(authLoginDto);

    // Assertions
    expect(actual).toEqual(['user-login-data']);
  });
});
