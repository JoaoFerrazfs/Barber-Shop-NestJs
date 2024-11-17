import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ContentsModule } from '../src/contents/contents.module';
import * as request from 'supertest';
import { Contents } from '../src/contents/contents.entity';
import { DataSource } from 'typeorm';

describe('Contents (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ContentsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);
    await dataSource.createQueryBuilder().delete().from(Contents).execute();
    await dataSource.query('ALTER TABLE contents AUTO_INCREMENT = 1');
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create a content', async () => {
    const payload = {
      title: 'Primeiro slide',
      imageUrl:
        'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
    };

    await request(app.getHttpServer())
      .post('/api/contents/module')
      .send(payload)
      .expect(201)
      .expect({
        data: {
          title: 'Primeiro slide',
          imageUrl:
            'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
          id: 1,
        },
      });
  });

  it('Read all contents', async () => {
    await request(app.getHttpServer())
      .get('/api/contents/modules')
      .expect(200)
      .expect({
        data: [
          {
            id: 1,
            title: 'Primeiro slide',
            imageUrl:
              'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
          },
        ],
      });
  });

  it('Read an unique content', async () => {
    await request(app.getHttpServer())
      .get('/api/contents/module/1')
      .expect(200)
      .expect({
        data: {
          id: 1,
          title: 'Primeiro slide',
          imageUrl:
            'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
        },
      });
  });

  it('Update a content', async () => {
    const payload = {
      title: 'Segundo slide',
      imageUrl:
        'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
    };

    await request(app.getHttpServer())
      .patch('/api/contents/module/1')
      .send(payload)
      .expect(200)
      .expect({
        id: 1,
        title: 'Segundo slide',
        imageUrl:
          'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
      });
  });

  it('Delete a content', async () => {
    await request(app.getHttpServer())
      .delete('/api/contents/module/1')
      .expect(204)
      .expect('');
  });
});
