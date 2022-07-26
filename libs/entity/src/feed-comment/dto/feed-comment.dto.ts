import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class FeedCommentDto {
  @IsString()
  @IsNotEmpty()
  desc;

  @IsNumber()
  likeCount;

  @IsNumber()
  commentCount;

  @IsString()
  @IsNotEmpty()
  createdAt;
}
