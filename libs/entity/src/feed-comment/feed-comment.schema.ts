import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import FeedCommentDto from './dto/feed-comment.dto';

export type FeedCommentDocument = FeedComment & Document;

@Schema()
export class FeedComment {
  constructor(desc: string, feedId: string, userId: ObjectId) {
    this.desc = desc;
    this.feed = feedId;
    this.user = userId;
  }

  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.String,
    default: () => nanoid(),
  })
  feedCommentNumber: string;

  @Prop({ required: true, maxlength: 2200, type: mongoose.Schema.Types.String })
  desc: string;

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
    ref: 'Feed',
  })
  feed: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: ObjectId;

  readonly dto: FeedCommentDto;
}

export const FeedCommentSchema = SchemaFactory.createForClass(FeedComment);

FeedCommentSchema.set('toObject', { virtuals: true });
FeedCommentSchema.set('toJSON', { virtuals: true });
