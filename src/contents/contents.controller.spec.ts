import { Test } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsServiceMock } from '../../test/mocks/Contents/contents.service.mock';
import { ContentCreateDTO } from './dto/content.create.dto';

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

  it('Should return a content', async () => {
    // Actions
    const actual = await contentsController.getModule(1);

    // Expectations
    expect(actual).toStrictEqual({ data: ['modules data'] });
  });

  it('Should return create contents', async () => {
    // Set
    const data: ContentCreateDTO = {
      title: 'title',
      imageUrl: 'https://image.com',
    };

    // Actions
    const actual = await contentsController.module(data);

    // Expectations
    expect(actual).toStrictEqual({ data: ['modules data'] });
  });
});
