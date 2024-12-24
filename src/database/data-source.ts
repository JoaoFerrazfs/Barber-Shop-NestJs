import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.NODE_ENV;
dotenv.config({
  path: ENV ? `.${ENV}.env` : '.env',
});

export const AppDataSource = new DataSource({
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
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  migrationsRun: true,
  logging: false,
  timezone: 'Z',
});
