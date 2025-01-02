import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.NODE_ENV;
dotenv.config({
  path: ENV ? `.${ENV}.env` : '.env',
});

export const DB_CONFIG: Record<string, DataSourceOptions> = {
  development: {
    type: 'mysql',
    host: process.env.DATA_BASE_HOST,
    port: Number(process.env.DATA_BASE_PORT),
    username: process.env.DATA_BASE_USERNAME,
    password: process.env.DATA_BASE_PASSWORD,
    database: process.env.DATA_BASE_NAME,
    synchronize: true,
    bigNumberStrings: true,
    multipleStatements: true,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    migrations: [path.join(__dirname, './migrations/mysql/,*{.ts,.js}')],
    migrationsRun: true,
    logging: false,
    timezone: 'Z',
    dropSchema: Boolean(process.env.DATA_BASE_DROP_SCHEMA),
  },
  ci: {
    type: 'sqlite',
    database: ':memory:',
    synchronize: false,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    migrations: [path.join(__dirname, './migrations/sqlite/*{.ts,.js}')],
    migrationsRun: true,
    logging: false,
    dropSchema: true,
  },
};
