import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateStoreDto {
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
  thumbnailBase64;
}
