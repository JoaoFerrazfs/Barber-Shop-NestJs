import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleModule } from '../src/schedule/schedule.module';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { Schedule } from '../src/schedule/schedule.entity';
import { scheduleDto } from './mocks/Schedule/schedule.respository.mock';

describe('Schedule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ScheduleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(Schedule).execute();
    await dataSource.query('ALTER TABLE schedule AUTO_INCREMENT = 1');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a schedule', async () => {
    // Actions
    const response = request(app.getHttpServer())
      .post('/api/schedule/create')
      .send(scheduleDto);

    // Assertions
    response.expect(201);

    expect((await response).body).toEqual({
      data: expect.objectContaining({
        startTime: '2024-11-21T15:33:00.000Z',
        endTime: '2024-11-21T16:03:00.000Z',
        type: '30',
        id: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    });
  });

  it('should get a schedule', async () => {
    // Actions
    const response = request(app.getHttpServer())
      .get('/api/schedule')
      .send(scheduleDto);

    // Assertions
    response.expect(200);

    expect((await response).body).toEqual({
      data: expect.objectContaining([
        {
          startTime: '2024-11-21T15:33:00.000Z',
          endTime: '2024-11-21T16:03:00.000Z',
          type: '30',
          id: 1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    });
  });
});
