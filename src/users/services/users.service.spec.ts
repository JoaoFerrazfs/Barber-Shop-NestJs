import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {
  user,
  UserRepositoryMock,
} from '../../../test/mocks/User/user.respository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create an user', async () => {
    // Set
    const { email, password, phone, type, name } = user;

    // Actions
    const actual = await service.create({ email, password, phone, type, name });

    // Assertions
    expect(actual).toBe(user);
  });

  it('should get an user by credentials', async () => {
    // Set
    const email = user.email;

    // Actions
    const actual = await service.getUserByCredentials(email);

    // Assertions
    expect(actual).toBe(user);
  });
});
