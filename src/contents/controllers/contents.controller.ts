import {
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
  UseInterceptors,
} from '@nestjs/common';
import { ContentsService } from '../services/contents.service';
import { ContentCreateDto } from '../dto/contentCreate.dto';
import { ApiResponse } from '@nestjs/swagger';
import {
  GetModules,
  ApiDeleteSwagguer,
  ApiUpdateSwagguer,
  CreateModule,
  GetModule,
} from '../swagguer/contents.examples';
import { Contents } from '../contents.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('api/contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @ApiResponse(GetModules)
  @Get('modules')
  async modules(): Promise<{ data: Contents[] } | { data: {} }> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return { data: await this.contentsService.modules() };
  }

  @UseInterceptors(CacheInterceptor)
  @ApiResponse(CreateModule)
  @Post('module')
  async module(@Body() data: ContentCreateDto): Promise<{ data: Contents }> {
    return { data: await this.contentsService.store(data) };
  }

  @ApiResponse(GetModule)
  @Get('module/:id')
  async getModule(@Param('id') id: number): Promise<{ data: Contents }> {
    return { data: await this.contentsService.getModuleById(id) };
  }

  @ApiDeleteSwagguer()
  @HttpCode(204)
  @Delete('module/:id')
  async delete(@Param('id') id: number) {
    if (!(await this.contentsService.getModuleById(id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (await this.contentsService.delete(id)) return {};

    throw new HttpException('Some error ocurred', HttpStatus.BAD_REQUEST);
  }

  @ApiUpdateSwagguer()
  @Patch('module/:id')
  async update(@Param('id') id: number, @Body() data: ContentCreateDto) {
    if (!(await this.contentsService.getModuleById(id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (await this.contentsService.update(id, data)) {
      return await this.contentsService.getModuleById(id);
    }

    throw new HttpException('Some error ocurred', HttpStatus.BAD_REQUEST);
  }
}
