import { AwsS3Module } from '@common/common/aws-s3/aws-s3.module';
import { FeedEntityModule } from '@entity/entity/feed/feed.module';
import { Feed, FeedSchema } from '@entity/entity/feed/feed.schema';
import { UserEntityModule } from '@entity/entity/user/user.module';
import { User, UserSchema } from '@entity/entity/user/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  controllers: [FeedController],
  providers: [FeedService],
  imports: [
    AwsS3Module,
    UserEntityModule,
    FeedEntityModule,
    MongooseModule.forFeature([
      { name: Feed.name, schema: FeedSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class FeedModule {}
