import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import FeedCommentDto from './dto/feed-comment.dto';

export type FeedCommentDocument = FeedComment & Document;

@Schema({ id: true })
export class FeedComment {
  constructor(desc: string, userId: ObjectId) {
    this.desc = desc;
    this.userId = userId;
  }

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: ObjectId;

  readonly dto: FeedCommentDto;
}

export const FeedCommentSchema = SchemaFactory.createForClass(FeedComment);

FeedCommentSchema.virtual('dto').get(function (): FeedCommentDto {
  return {
    desc: this.desc,
    likeCount: this.likeCount,
    commentCount: this.commentCount,
    createdAt: this.createdAt,
  };
});
