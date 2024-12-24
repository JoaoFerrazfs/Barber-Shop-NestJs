import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from './contents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contents } from '../contents.entity';
import {
  constent,
  contentCreateDTO,
  contentsRepositoryMock,
} from '../../../test/mocks/Contents/content.respository.mock';

describe('ContentsService', () => {
  let service: ContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentsService,
        {
          provide: getRepositoryToken(Contents),
          useValue: contentsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ContentsService>(ContentsService);
  });

  it('should get modules', async () => {
    // Action
    const actual = await service.modules();

    // Expectations
    expect(actual).toEqual(constent);
  });

  describe('getModuleById', () => {
    it('should return a single content by id', async () => {
      // Actions
      expect(await service.getModuleById(1)).toEqual(constent);
    });
  });

  describe('store', () => {
    it('should store and return a new content', async () => {
      // Actions
      expect(await service.store(contentCreateDTO)).toEqual(constent);
    });
  });

  describe('update', () => {
    it('should update and return true if content is updated', async () => {
      // Actions
      expect(await service.update(1, contentCreateDTO)).toBe(true);
    });

    it('should return false if content is not updated', async () => {
      // Set
      contentsRepositoryMock.update.mockResolvedValue({ affected: 0 });

      // Actions
      expect(await service.update(1, contentCreateDTO)).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete and return true if content is deleted', async () => {
      expect(await service.delete(1)).toBe(true);
    });

    it('should return false if content is not deleted', async () => {
      contentsRepositoryMock.delete.mockResolvedValue({ affected: 0 });

      expect(await service.delete(1)).toBe(false);
    });
  });
});
