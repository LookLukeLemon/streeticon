import { Test, TestingModule } from '@nestjs/testing';
import { FeedCommentController } from './feed-comment.controller';

describe('FeedCommentController', () => {
  let controller: FeedCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedCommentController],
    }).compile();

    controller = module.get<FeedCommentController>(FeedCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
