import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { imageUrl, title } from '../swagguer/contents.schemas';

export class ContentCreateDTO {
  @ApiProperty(title)
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty(imageUrl)
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
