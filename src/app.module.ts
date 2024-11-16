import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsModule } from './contents/contents.module';
import { ConfigModule } from '@nestjs/config';

import { AppDataSource } from './database/data-source';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV ? `.${ENV}.env` : '.env',
    }),
    ContentsModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
      }),
    }),
  ],
})
export class AppModule {}
