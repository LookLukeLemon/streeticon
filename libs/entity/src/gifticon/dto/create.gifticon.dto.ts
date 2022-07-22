import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateGifticonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  images: string[];

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  @IsNotEmpty()
  totalCount: number;
}
