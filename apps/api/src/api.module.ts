import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AllExceptionsFilter } from '@common/common/exception-filter/all-exceptions.filter';
import { AuthModule } from '@common/common/auth/auth.module';
import { StoreModule } from './store/store.module';
import { GifticonModule } from './gifticon/gifticon.module';
import { UserModule } from './user/user.module';
import { StoryModule } from './story/story.module';
import { FeedModule } from './feed/feed.module';
import { FeedCommentModule } from './feed-comment/feed-comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath:
        process.env.NODE_ENV == 'development'
          ? '.env.development'
          : process.env.NODE_ENV == 'staging'
          ? '.env.staging'
          : '.env.production',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>(
          'MONGODB_URI',
        )}?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    StoreModule,
    GifticonModule,
    UserModule,
    StoryModule,
    FeedModule,
    FeedCommentModule,
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class ApiModule {}
