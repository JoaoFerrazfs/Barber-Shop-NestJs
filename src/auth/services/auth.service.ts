import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { compareData } from '../../utils/encryption/util.encryption';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async signIn(
    email: string,
    password: string,
  ): Promise<Record<string, Record<string, string>>> {
    const user = await this.usersService.getUserByCredentials(email);

    if (!user) throw new NotFoundException();

    if (!(await compareData(password, user?.password)))
      throw new UnauthorizedException();

    const data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      type: user.type,
    };

    return { data };
  }
}
