import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationResult } from '../pagination-result';
import { Feed, FeedDocument } from './feed.schema';

@Injectable()
export class FeedEntityService {
  constructor(@InjectModel(Feed.name) private feedModel: Model<FeedDocument>) {}

  async findAll(
    page: number,
    perPage: number,
  ): Promise<PaginationResult<FeedDocument>> {
    const findQuery = this.feedModel
      .find({}, { _id: false })
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .populate('writer', '-_id');

    if (perPage) {
      findQuery.limit(perPage);
    }

    const items = await findQuery;
    const total = await this.feedModel.find().count();

    return { items, total };
  }

  async create(newFeed: Feed): Promise<FeedDocument> {
    const model = new this.feedModel(newFeed);
    return model.save();
  }

  async findAndIncreaseCommentCount(feedNumber: string, commentCount: number) {
    return await this.feedModel
      .findOneAndUpdate({ feedNumber }, { commentCount })
      .exec();
  }
}
