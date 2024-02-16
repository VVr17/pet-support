import { Test, TestingModule } from '@nestjs/testing';
import { PetService } from './pet.service';

describe('PetService', () => {
  let service: PetService;

  beforeEach(async () => {
    const mockUserRepository = {
      findAll: jest.fn(() => []),
      // Add other mock methods as needed
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: 'PETS_REPOSITORY',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<PetService>(PetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
