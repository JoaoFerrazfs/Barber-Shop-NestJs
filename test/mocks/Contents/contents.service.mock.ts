import { ContentsService } from '../../../src/contents/services/contents.service';

export const ContentsServiceMock = {
  provide: ContentsService,
  useValue: {
    modules: jest.fn().mockResolvedValue(['modules data']),
    getModuleById: jest.fn().mockResolvedValue(['modules data']),
    store: jest.fn().mockResolvedValue(['modules data']),
    delete: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(true),
  },
};
