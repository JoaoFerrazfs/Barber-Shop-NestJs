import { Test } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsServiceMock } from '../../test/mocks/Contents/contents.service.mock';

describe('ContentsController', () => {
  let contentsController: ContentsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [ContentsServiceMock],
    }).compile();

    contentsController = module.get(ContentsController);
  });

  it('Should return contents', async () => {
    // Actions
    const actual = await contentsController.modules();

    // Expectations
    expect(actual).toStrictEqual({ data: ['modules data'] });
  });
});
