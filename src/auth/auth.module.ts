import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONFIG } from './configs/auth.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: AUTH_CONFIG.secret,
      signOptions: { expiresIn: AUTH_CONFIG.expiresIn },
    }),
  ],
})
export class AuthModule {}
