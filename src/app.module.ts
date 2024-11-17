import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsModule } from './contents/contents.module';
import { ConfigModule } from '@nestjs/config';

import { AppDataSource } from './database/data-source';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

const ENV = process.env.NODE_ENV;

console.log(ENV ? `.${ENV}.env` : '.env');
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
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000,
        };
      },
    }),
  ],
})
export class AppModule {}
