import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentsModule } from './contents/contents.module';
import { Contents } from './contents/contents.entity';
import { ConfigModule } from '@nestjs/config';

import * as dotenv from 'dotenv';
import { dataSourceOptions } from './database/data-source';

dotenv.config();
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV != 'testing' ? '.env' : `.testing.env`,
    }),
    ContentsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
