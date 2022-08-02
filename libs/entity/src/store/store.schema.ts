import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import StoreDto from './dto/store.dto';

export type StoreDocument = Store & Document;

@Schema({ id: true })
export class Store {
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  password: string;

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  businessId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  category: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  desc: string;

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  phone: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  address: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  image: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    default: () => new Date().toUTCString(),
  })
  createdAt: string;

  @Prop({ type: mongoose.Schema.Types.Array })
  refreshToken: string[];

  readonly dto: StoreDto;
}

export const StoreSchema = SchemaFactory.createForClass(Store);

StoreSchema.virtual('dto').get(function (): StoreDto {
  return {
    businessId: this.businessId,
    image: this.image,
    name: this.name,
    address: this.address,
    category: this.category,
    desc: this.desc,
    phone: this.phone,
  };
});
