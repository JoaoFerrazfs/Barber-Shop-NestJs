import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { compareData } from '../../utils/encryption/util.encryption';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByCredentials(email);
    if (!user) throw new NotFoundException();

    if (!(await compareData(password, user?.password)))
      throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
      type: user.type,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
