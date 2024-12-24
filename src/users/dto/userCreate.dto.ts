import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsIn(['costumer', 'admin'])
  type: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Length(3)
  name: string;
}
