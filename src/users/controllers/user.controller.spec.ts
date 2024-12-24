import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserServiceMock } from '../../../test/mocks/User/user.service.mock';
import { UserCreateDto } from '../dto/userCreate.dto';
import { QueryFailedError } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('AuthController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceMock],
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
});
