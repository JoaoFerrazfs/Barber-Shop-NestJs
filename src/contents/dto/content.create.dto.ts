import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ContentCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
