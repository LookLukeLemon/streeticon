import {
  Gifticon,
  GifticonDocument,
} from '@entity/entity/gifticon/gifticon.schema';
import { PaginationResult } from '@entity/entity/pagination-result';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';

@Injectable()
export class GifticonEntityService {
  constructor(
    @InjectConnection() private connection: Connection,
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
      .find({ storeId })
      .sort({ _id: 1 })
      .skip((page - 1) * perPage)
      .populate('storeId');

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
