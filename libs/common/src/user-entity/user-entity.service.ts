import { User, UserDocument } from '@entity/entity/user/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOneByRefreshToken(
    refreshToken: string,
  ): Promise<UserDocument | undefined> {
    return this.userModel
      .findOne({ refreshToken: { $in: [refreshToken] } })
      .exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateByEmail(email: string, updateUser: UserDocument) {
    return this.userModel.updateOne({ email }, updateUser).exec();
  }

  async updateById(_id: ObjectId, updateUser: UserDocument) {
    return this.userModel.updateOne({ _id }, updateUser).exec();
  }

  async create(newUser: User): Promise<UserDocument> {
    const model = new this.userModel(newUser);
    return model.save();
  }
}
