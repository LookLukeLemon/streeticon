import { IsNotEmpty, IsString } from 'class-validator';

export default class UserDto {
  @IsString()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  nickname;

  @IsString()
  @IsNotEmpty()
  image;

  @IsString()
  @IsNotEmpty()
  country;

  @IsString()
  @IsNotEmpty()
  region;

  @IsString()
  @IsNotEmpty()
  address;

  @IsString()
  desc;

  @IsString()
  @IsNotEmpty()
  phone;

  @IsString()
  @IsNotEmpty()
  createdAt;
}
