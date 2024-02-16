import { Test, TestingModule } from '@nestjs/testing';
import { NoticeService } from './notice.service';

describe('NoticeService', () => {
  let service: NoticeService;

  beforeEach(async () => {
    const mockUserRepository = {
      findAll: jest.fn(() => []),
      // Add other mock methods as needed
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoticeService,
        {
          provide: 'NOTICES_REPOSITORY',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<NoticeService>(NoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
