import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ContentCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
