import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import FeedDto from './dto/feed.dto';

export type FeedDocument = Feed & Document;

@Schema({ id: true })
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

FeedSchema.virtual('dto').get(function (): FeedDto {
  return {
    feedNumber: this.feedNumber,
    image: this.image,
    desc: this.desc,
    likeCount: this.likeCount,
    commentCount: this.commentCount,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
});
