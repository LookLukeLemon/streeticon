import { FeedCommentEntityModule } from '@entity/entity/feed-comment/feed-comment.module';
import {
  FeedComment,
  FeedCommentSchema,
} from '@entity/entity/feed-comment/feed-comment.schema';
import { FeedEntityModule } from '@entity/entity/feed/feed.module';
import { UserEntityModule } from '@entity/entity/user/user.module';
import { User, UserSchema } from '@entity/entity/user/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedCommentController } from './feed-comment.controller';
import { FeedCommentService } from './feed-comment.service';

@Module({
  controllers: [FeedCommentController],
  providers: [FeedCommentService],
  imports: [
    UserEntityModule,
    FeedEntityModule,
    FeedCommentEntityModule,
    MongooseModule.forFeature([
      { name: FeedComment.name, schema: FeedCommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class FeedCommentModule {}
