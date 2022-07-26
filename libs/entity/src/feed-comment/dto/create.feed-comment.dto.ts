import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateFeedCommentDto {
  @IsString()
  @IsNotEmpty()
  image;

  @IsString()
  @IsNotEmpty()
  desc;
}
