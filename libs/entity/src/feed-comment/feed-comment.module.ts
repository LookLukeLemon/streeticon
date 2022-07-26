import { Module } from '@nestjs/common';
import { FeedCommentEntityService } from './feed-comment.service';

@Module({
  providers: [FeedCommentEntityService],
})
export class FeedCommentEntityModule {}
