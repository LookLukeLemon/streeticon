import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import UserDto from './dto/user.dto';

export type UserDocument = User & Document;

@Schema({ id: true })
export class User {
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  email;

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  password: string;

  @Prop({ type: mongoose.Schema.Types.String })
  desc: string;

  @Prop({
    unique: true,
    sparse: true,
    type: mongoose.Schema.Types.String,
  })
  phone: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  country: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  region: string;

  @Prop({ type: mongoose.Schema.Types.String })
  address: string;

  @Prop({ type: mongoose.Schema.Types.String })
  image: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    default: new Date().toUTCString(),
  })
  createdAt: string;

  @Prop({ type: mongoose.Schema.Types.Array })
  refreshToken: string[];

  readonly dto: UserDto;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('dto').get(function (): UserDto {
  return {
    email: this.email,
    image: this.image,
    name: this.name,
    country: this.country,
    region: this.region,
    address: this.address,
    desc: this.desc,
    phone: this.phone,
    createdAt: this.createdAt,
  };
});
