import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import FeedDto from './dto/feed.dto';

export type FeedDocument = Feed & Document;

@Schema()
export class Feed {
  constructor(desc: string, image: string, writer: ObjectId) {
    this.desc = desc;
    this.image = image;
    this.writer = writer;
  }

  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.String,
    default: () => nanoid(),
  })
  feedNumber: string;

  @Prop({ required: true, maxlength: 2200, type: mongoose.Schema.Types.String })
  desc: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  image: string;

  @Prop({ default: 0, type: mongoose.Schema.Types.Number })
  likeCount: number;

  @Prop({ default: 0, type: mongoose.Schema.Types.Number })
  commentCount: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    default: () => new Date().toUTCString(),
  })
  createdAt: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.String,
    default: () => new Date().toUTCString(),
  })
  updatedAt: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  writer: ObjectId;

  readonly dto: FeedDto;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);

FeedSchema.virtual('comments', {
  ref: 'FeedComment',
  localField: 'feedNumber',
  foreignField: 'feed',
});

FeedSchema.set('toObject', { virtuals: true });
FeedSchema.set('toJSON', { virtuals: true });
