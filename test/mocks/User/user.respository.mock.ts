import { User } from '../../../src/users/user.entity';

export const user: User = {
  id: 1,
  phone: '9 9999 9999',
  name: 'test',
  type: 'guest',
  email: 'test@test.com',
  password: '12345678',
  createdAt: new Date('2024-12-14T13:17:56.075Z'),
  updatedAt: new Date('2024-12-14T13:17:56.075Z'),
};

export const UserRepositoryMock = {
  findOne: jest.fn().mockResolvedValue(user),
  create: jest.fn().mockResolvedValue(user),
  save: jest.fn().mockResolvedValue(user),
};
