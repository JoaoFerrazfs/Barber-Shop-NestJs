import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UsersService } from '../services/users.service';
import { QueryFailedError } from 'typeorm';
import { encryptData } from '../../utils/encryption/util.encryption';
import { ApiCreateUserDocs } from '../oas/user.oas';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiCreateUserDocs()
  @Post('create')
  public async create(
    @Body() userCreate: UserCreateDto,
  ): Promise<Record<string, Record<string, string>>> {
    try {
      userCreate.password = await encryptData(userCreate.password);
      const { name, email, phone, type } =
        await this.userService.create(userCreate);
      return { data: { name, email, phone, type } };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('Duplicate')
      ) {
        throw new UnprocessableEntityException({
          message: 'Email already exists',
        });
      }

      throw new UnprocessableEntityException(error.message);
    }
  }
}
