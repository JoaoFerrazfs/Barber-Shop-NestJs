import { ContentsService } from '../../../src/contents/contents.service';

export const ContentsServiceMock = {
  provide: ContentsService,
  useValue: {
    modules: jest.fn().mockResolvedValue(['modules data']),
    getModuleById: jest.fn().mockResolvedValue(['modules data']),
    store: jest.fn().mockResolvedValue(['modules data']),
  },
};
