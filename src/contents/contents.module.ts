import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contents } from './contents.entity';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService],
  imports: [TypeOrmModule.forFeature([Contents])],
})
export class ContentsModule {}
