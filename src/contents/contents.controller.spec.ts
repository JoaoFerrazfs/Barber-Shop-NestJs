import { Test } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';

describe('ContentsController', () => {
  let contentsController: ContentsController;
  let contentsService: ContentsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [ContentsService],
    }).compile();

    contentsController = module.get(ContentsController);
    contentsService = module.get(ContentsService);
  });

  it('Should return contents', () => {
    // Set
    const expected = [
      {
        imageUrl:
          'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
        title: 'Primeiro slide',
      },
      {
        imageUrl:
          'https://cdn.leroymerlin.com.br/uploads/img/banners/_1_home_tv_%7C_fim_de_semana_de_piscinas_e_spas_com_ate_30percentoff_08_11_a_10_11_918a_1180x320.png?width=1200',
        title: 'Segundo slide',
      },
    ];
    // Expectation
    jest.spyOn(contentsService, 'modules').mockImplementation(() => expected);

    // Actions
    const actual = contentsController.modules();

    expect(actual).toStrictEqual({ data: expected });
  });
});
