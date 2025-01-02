import { Test } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsServiceMock } from '../../../test/mocks/Contents/contents.service.mock';
import { ContentCreateDto } from '../dto/contentCreate.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtServiceMock } from '../../../test/mocks/Auth/jwt.service.mock';

describe('ContentsController', () => {
  let contentsController: ContentsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ContentsController],
      imports: [CacheModule.register()],
      providers: [ContentsServiceMock, JwtServiceMock],
    }).compile();

    contentsController = module.get<ContentsController>(ContentsController);
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
    const data: ContentCreateDto = {
      title: 'title',
      imageUrl: 'https://image.com',
    };

    // Actions
    const actual = await contentsController.module(data);

    // Expectations
    expect(actual).toStrictEqual({ data: ['modules data'] });
  });

  it('Should return undefined for successful deletion', async () => {
    // Actions
    const actual = await contentsController.delete(1);

    // Expectations
    expect(actual).toEqual({});
  });

  it('Should return not found for not valid user', async () => {
    // Set
    ContentsServiceMock.useValue.getModuleById.mockResolvedValueOnce(null);

    // Action
    const actual = contentsController.delete(1);

    // Expectations
    await expect(actual).rejects.toThrow(
      new HttpException('User not found', HttpStatus.NOT_FOUND),
    );
  });

  it('Should return bad request for not valid user', async () => {
    // Set
    ContentsServiceMock.useValue.delete.mockResolvedValueOnce(false);

    // Action
    const actual = contentsController.delete(1);

    // Expectations
    await expect(actual).rejects.toThrow(
      new HttpException('Some error occurred', HttpStatus.BAD_REQUEST),
    );
  });

  it('Should update a content', async () => {
    // Set
    const data: ContentCreateDto = {
      title: 'title',
      imageUrl: 'https://image.com',
    };

    // Action
    const actual = await contentsController.update(1, data);

    // Expectations
    expect(actual).toStrictEqual({ data: ['modules data'] });
  });

  it('Should not update a not found content', async () => {
    // Set
    const data: ContentCreateDto = {
      title: 'title',
      imageUrl: 'https://image.com',
    };
    ContentsServiceMock.useValue.getModuleById.mockResolvedValueOnce(null);

    // Action
    const actual = contentsController.update(1, data);

    // Expectations
    await expect(actual).rejects.toThrow(
      new HttpException('User not found', HttpStatus.NOT_FOUND),
    );
  });

  it('Should return a generic error', async () => {
    // Set
    const data: ContentCreateDto = {
      title: 'title',
      imageUrl: 'https://image.com',
    };
    ContentsServiceMock.useValue.update.mockResolvedValueOnce(false);

    // Action
    const actual = contentsController.update(1, data);

    // Expectations
    await expect(actual).rejects.toThrow(
      new HttpException('Some error occurred', HttpStatus.BAD_REQUEST),
    );
  });
});
