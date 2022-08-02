import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserImageDto {
  @IsString()
  @IsNotEmpty()
  email;

  @IsString()
  thumbnailBase64;
}
