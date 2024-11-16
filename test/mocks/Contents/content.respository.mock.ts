import { Contents } from '../../../src/contents/contents.entity';
import { ContentCreateDTO } from '../../../src/contents/dto/content.create.dto';

export const constent: Contents = {
  id: 1,
  imageUrl: 'https://image.com',
  title: 'First Title',
};

export const contentCreateDTO: ContentCreateDTO = {
  imageUrl: constent.title,
  title: constent.title,
};

export const contentsRepositoryMock = {
  find: jest.fn().mockResolvedValue(constent),
  findOneBy: jest.fn().mockResolvedValue(constent),
  create: jest.fn().mockResolvedValue(contentCreateDTO),
  save: jest.fn().mockResolvedValue(constent),
  update: jest.fn().mockResolvedValue({ affected: 1 }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};
