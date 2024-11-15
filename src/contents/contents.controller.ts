import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentCreateDTO } from './dto/content.create.dto';

@Controller('api/contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get('modules')
  async modules() {
    return { data: await this.contentsService.modules() };
  }

  @Get('module/:id')
  async getModule(@Param('id') id: number) {
    return { data: await this.contentsService.getModuleById(id) };
  }

  @Post('module')
  async module(@Body() data: ContentCreateDTO) {
    return { data: await this.contentsService.store(data) };
  }
}
