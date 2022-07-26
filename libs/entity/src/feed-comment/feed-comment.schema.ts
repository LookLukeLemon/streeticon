import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import FeedCommentDto from './dto/feed-comment.dto';

export type FeedCommentDocument = FeedComment & Document;

@Schema({ id: true })
export class FeedComment {
  constructor(desc: string, feedNumber: string, userId: ObjectId) {
    this.desc = desc;
    this.feed = feedNumber;
    this.userId = userId;
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
  userId: ObjectId;

  readonly dto: FeedCommentDto;
}

export const FeedCommentSchema = SchemaFactory.createForClass(FeedComment);

FeedCommentSchema.virtual('dto').get(function (): FeedCommentDto {
  return {
    feedCommentNumber: this.feedCommentNumber,
    desc: this.desc,
    likeCount: this.likeCount,
    commentCount: this.commentCount,
    createdAt: this.createdAt,
  };
});
