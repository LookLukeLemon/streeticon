import { Store, StoreDocument } from '@entity/entity/store/store.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';

@Injectable()
export class StoreEntityService {
  constructor(
    @InjectConnection() private connection: Connection,
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
    return this.storeModel.find().exec();
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
