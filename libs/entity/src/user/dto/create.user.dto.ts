import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
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
  password;

  @IsString()
  @IsNotEmpty()
  country;

  @IsString()
  @IsNotEmpty()
  region;
}
