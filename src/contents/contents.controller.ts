import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentCreateDTO } from './dto/content.create.dto';

@Controller('api/contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get('modules')
  async modules() {
    return { data: await this.contentsService.modules() };
  }

  @Post('module')
  async module(@Body() data: ContentCreateDTO) {
    return { data: await this.contentsService.store(data) };
  }

  @Get('module/:id')
  async getModule(@Param('id') id: number) {
    return { data: await this.contentsService.getModuleById(id) };
  }

  @HttpCode(204)
  @Delete('module/:id')
  async delete(@Param('id') id: number) {
    if (!(await this.contentsService.getModuleById(id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (await this.contentsService.delete(id)) return {};

    throw new HttpException('Some error ocurred', HttpStatus.BAD_REQUEST);
  }

  @Patch('module/:id')
  async update(@Param('id') id: number, @Body() data: ContentCreateDTO) {
    if (!(await this.contentsService.getModuleById(id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (await this.contentsService.update(id, data)) {
      return await this.contentsService.getModuleById(id);
    }

    throw new HttpException('Some error ocurred', HttpStatus.BAD_REQUEST);
  }
}
