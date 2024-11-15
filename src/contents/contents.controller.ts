import { Body, Controller, Get, Post } from '@nestjs/common';
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
  module(@Body() data: ContentCreateDTO) {
    return this.contentsService.store(data);
  }
}
