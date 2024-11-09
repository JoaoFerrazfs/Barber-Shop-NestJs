import { Controller, Get } from '@nestjs/common';
import { ContentsService } from './contents.service';

@Controller('api/contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}
  @Get('modules')
  modules() {
    return { data: this.contentsService.modules() };
  }
}
