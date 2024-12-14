import { UsersService } from '../../../src/users/services/users.service';
import { User } from '../../../src/users/user.entity';

const user = new User();
user.email = 'test@test.com';
user.password = '$2b$10$2wbanYpKVvuFYOApn0TY3OrgBiM2OODtIiQR12vjizQO1rb4OUZxO';
user.name = 'test';
user.phone = '99999999';
user.type = 'guest';

export const UserServiceMock = {
  provide: UsersService,
  useValue: {
    getUserByCredentials: jest.fn().mockResolvedValue(user),
    create: jest.fn().mockResolvedValue(user),
  },
};
