import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  password;

  @IsString()
  @IsNotEmpty()
  businessId;

  @IsString()
  @IsNotEmpty()
  category;

  @IsString()
  @IsNotEmpty()
  desc;

  @IsString()
  @IsNotEmpty()
  phone;

  @IsString()
  @IsNotEmpty()
  address;

  @IsString()
  @IsNotEmpty()
  thumbnailBase64;
}
