import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import GifticonDto from './dto/gifticon.dto';

export type GifticonDocument = Gifticon & Document;

@Schema({ id: true })
export class Gifticon {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  desc: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  image1: string;

  @Prop({ type: mongoose.Schema.Types.String })
  image2: string;

  @Prop({ type: mongoose.Schema.Types.String })
  image3: string;

  @Prop({ type: mongoose.Schema.Types.String })
  image4: string;

  @Prop({ type: mongoose.Schema.Types.String })
  image5: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  price: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  totalCount: number;

  @Prop({ required: true, type: mongoose.Schema.Types.Number, default: 0 })
  soldCount: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    default: new Date().toUTCString(),
  })
  createdAt: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  })
  storeId: ObjectId;

  readonly dto: GifticonDto;
}

export const GifticonSchema = SchemaFactory.createForClass(Gifticon);

GifticonSchema.index({ name: 1, storeId: 1 }, { unique: true });
GifticonSchema.virtual('dto').get(function (): GifticonDto {
  return {
    name: this.name,
    desc: this.desc,
    image1: this.image1,
    image2: this.image2,
    image3: this.image3,
    image4: this.image4,
    image5: this.image5,
    price: this.price,
    totalCount: this.totalCount,
  };
});
