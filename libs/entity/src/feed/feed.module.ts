import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FeedComment,
  FeedCommentSchema,
} from '../feed-comment/feed-comment.schema';
import { Feed, FeedSchema } from './feed.schema';
import { FeedEntityService } from './feed.service';

@Module({
  providers: [FeedEntityService],
  exports: [FeedEntityService],
  imports: [
    MongooseModule.forFeature([
      { name: Feed.name, schema: FeedSchema },
      { name: FeedComment.name, schema: FeedCommentSchema },
    ]),
  ],
})
export class FeedEntityModule {}
