import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  email;

  @IsString()
  nickname;

  @IsString()
  phone;

  @IsString()
  address;
}
