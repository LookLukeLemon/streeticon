import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class GifticonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  image1: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  image2: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  image3: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  image4: string;

  @IsString()
  @IsNotEmpty()
  @IsString()
  image5: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  totalCount: number;
}
