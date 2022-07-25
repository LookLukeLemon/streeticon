import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  email;

  @IsString()
  phone;

  @IsString()
  address;

  @IsString()
  thumbnailBase64;
}
