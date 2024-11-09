import { Controller, Get } from '@nestjs/common';

@Controller('api/contents')
export class ContentsController {
  @Get('modules')
  modules() {
    const data = [
      {
        title: 'Primeiro slide',
        imageUrl:
          'https://cdn.leroymerlin.com.br/uploads/img/banners/_7_home_tv_%7C_opecom_bricolagem_%7C_ordenada_25_10_a_17_11_27f8_1180x320.png?width=1200',
      },
      {
        title: 'Segundo slide',
        imageUrl:
          'https://cdn.leroymerlin.com.br/uploads/img/banners/_1_home_tv_%7C_fim_de_semana_de_piscinas_e_spas_com_ate_30percentoff_08_11_a_10_11_918a_1180x320.png?width=1200',
      },
    ];

    return { data };
  }
}
