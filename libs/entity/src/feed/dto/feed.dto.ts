import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class FeedDto {
  @IsString()
  @IsNotEmpty()
  feedNumber;

  @IsString()
  @IsNotEmpty()
  image;

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
