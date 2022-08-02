import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateFeedCommentDto {
  @IsString()
  @IsNotEmpty()
  feedNumber;

  @IsString()
  @IsNotEmpty()
  comment;
}
