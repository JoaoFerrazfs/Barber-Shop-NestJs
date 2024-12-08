import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async signIn(userName: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByCredentials(
      userName,
      password,
    );

    if (user?.password !== password) throw new UnauthorizedException();

    return user;
  }
}
