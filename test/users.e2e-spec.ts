import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/user.entity';

describe('Users (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(User).execute();
    await dataSource.query('ALTER TABLE users AUTO_INCREMENT = 1');
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create a user', async () => {
    // Set
    const payload = {
      email: 'joao@gmail124.com',
      password: '12345678',
      phone: '31971694273',
      name: 'Joao',
    };

    //Actions
    const response = request(app.getHttpServer())
      .post('/api/users/create')
      .send(payload);

    // Assertions
    await response.expect(201).expect({
      data: {
        name: 'Joao',
        email: 'joao@gmail124.com',
        phone: '31971694273',
        type: 'customer',
      },
    });
  });

  it('Perform a user login', async () => {
    // Set
    const payload = {
      email: 'joao@gmail124.com',
      password: '12345678',
    };

    //Actions
    const response = request(app.getHttpServer())
      .post('/api/auth/login')
      .send(payload);

    // Assertions
    await response.expect(200).expect((res): void => {
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('access_token');
      expect(typeof res.body.data.access_token).toBe('string');
    });
  });
});
