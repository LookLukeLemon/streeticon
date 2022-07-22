import { Test, TestingModule } from '@nestjs/testing';
import { GifticonController } from './gifticon.controller';

describe('GifticonController', () => {
  let controller: GifticonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GifticonController],
    }).compile();

    controller = module.get<GifticonController>(GifticonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
