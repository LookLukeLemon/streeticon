import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { FeedCommentEntityModule } from './feed-comment/feed-comment.module';
import { FeedEntityModule } from './feed/feed.module';
import { GifticonEntityModule } from './gifticon/gifticon.module';
import { StoreEntityModule } from './store/store.module';
import { UserEntityModule } from './user/user.module';

@Module({
  providers: [EntityService],
  exports: [EntityService],
  imports: [
    UserEntityModule,
    StoreEntityModule,
    GifticonEntityModule,
    FeedEntityModule,
    FeedCommentEntityModule,
  ],
})
export class EntityModule {}
