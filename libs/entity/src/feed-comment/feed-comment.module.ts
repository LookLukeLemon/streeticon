import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feed, FeedSchema } from '../feed/feed.schema';
import { FeedComment, FeedCommentSchema } from './feed-comment.schema';
import { FeedCommentEntityService } from './feed-comment.service';

@Module({
  providers: [FeedCommentEntityService],
  exports: [FeedCommentEntityService],
  imports: [
    MongooseModule.forFeature([
      { name: Feed.name, schema: FeedSchema },
      { name: FeedComment.name, schema: FeedCommentSchema },
    ]),
  ],
})
export class FeedCommentEntityModule {}
