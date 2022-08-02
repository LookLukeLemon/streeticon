import { Test, TestingModule } from '@nestjs/testing';
import { FeedCommentEntityService } from './feed-comment.service';

describe('FeedCommentEntityService', () => {
  let service: FeedCommentEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedCommentEntityService],
    }).compile();

    service = module.get<FeedCommentEntityService>(FeedCommentEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
