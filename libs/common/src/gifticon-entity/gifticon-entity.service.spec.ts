import { Test, TestingModule } from '@nestjs/testing';
import { GifticonEntityService } from './gifticon-entity.service';

describe('GifticonEntityService', () => {
  let service: GifticonEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GifticonEntityService],
    }).compile();

    service = module.get<GifticonEntityService>(GifticonEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
