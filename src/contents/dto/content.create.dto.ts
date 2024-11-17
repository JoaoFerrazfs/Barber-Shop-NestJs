import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ImageUrl, Title } from '../swagguer/contents.examples';

export class ContentCreateDTO {
  @ApiProperty(Title)
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty(ImageUrl)
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;
}
