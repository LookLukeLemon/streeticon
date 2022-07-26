import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { PaginationResult } from '../pagination-result';
import { Gifticon, GifticonDocument } from './gifticon.schema';

@Injectable()
export class GifticonEntityService {
  constructor(
    @InjectModel(Gifticon.name) private gifticonModel: Model<GifticonDocument>,
  ) {}

  async findOneByNameWithStoreId(
    name: string,
    storeId: ObjectId,
  ): Promise<GifticonDocument | undefined> {
    return await this.gifticonModel.findOne({ name, storeId }).exec();
  }

  async findAll(
    storeId: ObjectId,
    page: number,
    perPage: number,
  ): Promise<PaginationResult<GifticonDocument>> {
    const findQuery = this.gifticonModel
      .find({ storeId }, { _id: false })
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .populate('storeId', '-_id');

    if (perPage) {
      findQuery.limit(perPage);
    }

    const items = await findQuery;
    const total = await this.gifticonModel.find({ storeId }).count();

    return { items, total };
  }

  async create(newGifticon: Gifticon): Promise<GifticonDocument> {
    const model = new this.gifticonModel(newGifticon);
    return model.save();
  }

  async update(_id: ObjectId, gifticon: Gifticon) {
    return await this.gifticonModel.updateOne({ _id }, gifticon);
  }
}
