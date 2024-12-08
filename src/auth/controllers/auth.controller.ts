import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/user.entity';
import { AuthLoginDto } from '../dto/auth.login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async signIn(@Body() authLoginDto: AuthLoginDto): Promise<User> {
    return await this.authService.signIn(
      authLoginDto.email,
      authLoginDto.password,
    );
  }
}
