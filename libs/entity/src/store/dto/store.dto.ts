import { IsNotEmpty, IsString } from 'class-validator';

export default class StoreDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  businessId;

  @IsString()
  @IsNotEmpty()
  image;

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
}
