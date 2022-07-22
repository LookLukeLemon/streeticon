import { Test, TestingModule } from '@nestjs/testing';
import { StoreEntityService } from './store-entity.service';

describe('StoreEntityService', () => {
  let service: StoreEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreEntityService],
    }).compile();

    service = module.get<StoreEntityService>(StoreEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
