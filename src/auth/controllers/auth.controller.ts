import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthLoginDto } from '../dto/authLogin.dto';
import { AuthLoginDocs } from '../oas/auth.schemas';

@Controller('api/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthLoginDocs()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async signIn(@Body() authLoginDto: AuthLoginDto): Promise<{
    data: {
      access_token: string;
    };
  }> {
    return {
      data: await this.authService.signIn(
        authLoginDto.email,
        authLoginDto.password,
      ),
    };
  }
}
