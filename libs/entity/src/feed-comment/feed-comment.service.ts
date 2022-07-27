import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FeedComment, FeedCommentDocument } from './feed-comment.schema';

@Injectable()
export class FeedCommentEntityService {
  constructor(
    @InjectModel(FeedComment.name)
    private feedCommentModel: Model<FeedCommentDocument>,
  ) {}

  async create(newFeedComment: FeedComment): Promise<FeedCommentDocument> {
    const model = new this.feedCommentModel(newFeedComment);
    return model.save();
  }

  async getCount(feedId: ObjectId): Promise<number> {
    return this.feedCommentModel.count({ feed: feedId }).exec();
  }
}
