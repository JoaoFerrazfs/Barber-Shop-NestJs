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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContentsService } from '../services/contents.service';
import { ContentCreateDto } from '../dto/contentCreate.dto';

import { Contents } from '../contents.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  ApiCreateContentDoc,
  ApiGetContentDoc,
  ApiGetContentByIdDoc,
  ApiUpdateDoc,
  ApiDeleteContentDoc,
} from '../oas/contents.oas';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from '../../auth/enums/role.enum';
import { Role } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('api/contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @ApiGetContentDoc()
  @Get('modules')
  async modules(): Promise<{ data: Contents[] } | { data: object }> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return { data: await this.contentsService.modules() };
  }

  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @ApiCreateContentDoc()
  @Post('module')
  async module(@Body() data: ContentCreateDto): Promise<{ data: Contents }> {
    return { data: await this.contentsService.store(data) };
  }

  @ApiGetContentByIdDoc()
  @Get('module/:id')
  async getModule(@Param('id') id: number): Promise<{ data: Contents }> {
    return { data: await this.contentsService.getModuleById(id) };
  }

  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiDeleteContentDoc()
  @HttpCode(204)
  @Delete('module/:id')
  async delete(@Param('id') id: number): Promise<object> {
    if (!(await this.contentsService.getModuleById(id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (await this.contentsService.delete(id)) return {};

    throw new HttpException('Some error occurred', HttpStatus.BAD_REQUEST);
  }

  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiUpdateDoc()
  @Patch('module/:id')
  async update(
    @Param('id') id: number,
    @Body() data: ContentCreateDto,
  ): Promise<{ data: Contents }> {
    if (!(await this.contentsService.getModuleById(id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (await this.contentsService.update(id, data)) {
      return { data: await this.contentsService.getModuleById(id) };
    }

    throw new HttpException('Some error occurred', HttpStatus.BAD_REQUEST);
  }
}
