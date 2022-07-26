import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateFeedDto {
  @IsString()
  @IsNotEmpty()
  image;

  @IsString()
  @IsNotEmpty()
  desc;
}
