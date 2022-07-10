import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database/database.sqlite3',
  synchronize: true,
  // entities: ['src/**/*.entity.ts'],
  entities: ['dist/**/*.entity.js'],
  // migrations: ['src/migration/**/*.ts'],
  migrations: ['dist/migration/**/*.js'],
  migrationsTableName: 'migrations',
  subscribers: ['src/subscriber/**/*.ts'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
