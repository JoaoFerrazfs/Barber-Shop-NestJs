import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ContentsModule } from '../src/contents/contents.module';
import * as request from 'supertest';

describe('Contents (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ContentsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Content CRUD', () => {
    const payload = {
      title: 'Primeiro slide',
      imageUrl:
        'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
    };

    // Create
    request(app.getHttpServer())
      .post('/api/contents/module')
      .send(payload)
      .expect(200)
      .expect({
        title: 'segundo titulo',
        imageUrl:
          'https://cdn.leroymerlin.com.br/uploads/img/banners/_1_home_tv_%7C_fim_de_semana_de_piscinas_e_spas_com_ate_30percentoff_08_11_a_10_11_918a_1180x320.png?width=1200',
        id: 1,
      });

    // Read
    return request(app.getHttpServer())
      .get('/api/contents/modules')
      .expect(200)
      .expect({
        data: [
          {
            id: 1,
            title: 'segundo titulo',
            imageUrl:
              'https://cdn.leroymerlin.com.br/uploads/img/banners/_1_home_tv_%7C_fim_de_semana_de_piscinas_e_spas_com_ate_30percentoff_08_11_a_10_11_918a_1180x320.png?width=1200',
          },
        ],
      });
  });
});
