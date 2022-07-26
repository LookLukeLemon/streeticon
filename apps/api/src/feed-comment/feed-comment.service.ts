import CreateFeedCommentDto from '@entity/entity/feed-comment/dto/create.feed-comment.dto';
import { FeedComment } from '@entity/entity/feed-comment/feed-comment.schema';
import { FeedCommentEntityService } from '@entity/entity/feed-comment/feed-comment.service';
import { FeedEntityService } from '@entity/entity/feed/feed.service';
import UserDto from '@entity/entity/user/dto/user.dto';
import { UserEntityService } from '@entity/entity/user/user.service';
import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class FeedCommentService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly userEntityService: UserEntityService,
    private readonly feedEntityService: FeedEntityService,
    private readonly feedCommentEntityService: FeedCommentEntityService,
  ) {}

  async postComment(
    body: CreateFeedCommentDto,
    user: UserDto,
  ): Promise<FeedComment> {
    const foundUser = await this.userEntityService.findOneByEmail(user.email);
    const commentCount =
      await this.feedCommentEntityService.getCountByFeedNumber(body.feedNumber);

    if (!foundUser) throw new ConflictException();

    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      await this.feedEntityService.findAndIncreaseCommentCount(
        body.feedNumber,
        commentCount + 1,
      );

      const newComment = new FeedComment(
        body.comment,
        body.feedNumber,
        foundUser._id,
      );
      const createdComment = await this.feedCommentEntityService.create(
        newComment,
      );

      await transactionSession.commitTransaction();
      return createdComment;
    } catch (err) {
      await transactionSession.abortTransaction();
      throw new HttpException('Failed to add feed', 500);
    } finally {
      transactionSession.endSession();
    }
  }
}
