import { User, UserDocument } from '@entity/entity/user/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.userModel.findOne({ name }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(newUser: UserDocument): Promise<UserDocument> {
    const model = new this.userModel(newUser);
    return model.save();
  }
}
