import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedComment, FeedCommentSchema } from './feed-comment.schema';
import { FeedCommentEntityService } from './feed-comment.service';

@Module({
  providers: [FeedCommentEntityService],
  exports: [FeedCommentEntityService],
  imports: [
    MongooseModule.forFeature([
      { name: FeedComment.name, schema: FeedCommentSchema },
    ]),
  ],
})
export class FeedCommentEntityModule {}
