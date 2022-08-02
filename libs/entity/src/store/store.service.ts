import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Store, StoreDocument } from './store.schema';

@Injectable()
export class StoreEntityService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  async findOneByName(name: string): Promise<StoreDocument | undefined> {
    return await this.storeModel.findOne({ name }).exec();
  }

  async findOneByBusinessId(
    businessId: string,
  ): Promise<StoreDocument | undefined> {
    return this.storeModel.findOne({ businessId }).exec();
  }

  async findOneByRefreshToken(
    refreshToken: string,
  ): Promise<StoreDocument | undefined> {
    return this.storeModel
      .findOne({ refreshToken: { $in: [refreshToken] } })
      .exec();
  }

  async findAll(): Promise<StoreDocument[]> {
    return this.storeModel.find({}, { _id: false }).exec();
  }

  async updateByBusinessId(businessId: string, updateStore: StoreDocument) {
    return this.storeModel.updateOne({ businessId }, updateStore).exec();
  }

  async updateById(_id: ObjectId, updateStore: StoreDocument) {
    return this.storeModel.updateOne({ _id }, updateStore).exec();
  }

  async create(newStore: Store): Promise<StoreDocument> {
    const model = new this.storeModel(newStore);
    return model.save();
  }
}
