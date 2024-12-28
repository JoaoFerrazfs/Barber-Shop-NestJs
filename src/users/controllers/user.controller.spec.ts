import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserServiceMock } from '../../../test/mocks/User/user.service.mock';
import { UserCreateDto } from '../dto/userCreate.dto';
import { QueryFailedError } from 'typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONFIG } from '../../auth/configs/auth.config';

describe('AuthController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceMock],
      imports: [
        JwtModule.register({
          global: true,
          secret: AUTH_CONFIG.secret,
          signOptions: { expiresIn: AUTH_CONFIG.expiresIn },
        }),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should create an user', async () => {
    // Set
    const userCreateDto: UserCreateDto = {
      email: 'test@test.com',
      password: '12345678',
      type: 'guest',
      phone: '9 9999 9999',
      name: 'test',
    };

    // Actions
    const actual = await controller.create(userCreateDto);

    // Assertions
    expect(actual).toEqual({
      data: {
        email: 'test@test.com',
        name: 'test',
        phone: '99999999',
        type: 'guest',
      },
    });
  });

  it('should not create duplicate an user', async () => {
    // Set
    const userCreateDto: UserCreateDto = {
      email: 'test@test.com',
      password: '12345678',
      type: 'guest',
      phone: '9 9999 9999',
      name: 'test',
    };

    UserServiceMock.useValue.create.mockRejectedValue(
      new QueryFailedError('Duplicate', undefined, new Error('Duplicate')),
    );

    // Actions
    const actual = controller.create(userCreateDto);

    // Assertions
    await expect(actual).rejects.toThrow(
      new UnprocessableEntityException('Email already exists'),
    );
  });

  it('should throw unprocessable entity error', async () => {
    // Set
    const userCreateDto: UserCreateDto = {
      email: 'test@test.com',
      password: '12345678',
      type: 'guest',
      phone: '9 9999 9999',
      name: 'test',
    };

    UserServiceMock.useValue.create.mockRejectedValue(
      new Error('Generic error'),
    );

    // Actions
    const actual = controller.create(userCreateDto);

    // Assertions
    await expect(actual).rejects.toThrow(
      new UnprocessableEntityException('Generic error'),
    );
  });

  it('should get user data', async () => {
    // Set
    const user = {
      type: 'customer',
      email: 'joao@test.com',
      sub: '1',
      id: '1',
      username: 'joao',
    };

    const request = {
      headers: {
        authorization: 'Bearer mockToken',
      },
      user: user,
    } as ExpressRequest;

    // Actions
    const actual = await controller.getUserData(request);

    // Assertions
    expect(actual).toEqual({
      name: user.username,
      email: user.email,
      type: user.type,
    });
  });
});
