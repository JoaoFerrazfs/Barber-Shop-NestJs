import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.testing.env' : '.env',
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATA_BASE_HOST,
  port: Number(process.env.DATA_BASE_PORT),
  username: process.env.DATA_BASE_USERNAME,
  password: process.env.DATA_BASE_PASSWORD,
  database: process.env.DATA_BASE_NAME,
  synchronize: true,
  bigNumberStrings: true,
  multipleStatements: true,
  logging: false,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  migrations: ['./migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
