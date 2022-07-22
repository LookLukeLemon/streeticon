import {
  Gifticon,
  GifticonSchema,
} from '@entity/entity/gifticon/gifticon.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GifticonEntityService } from './gifticon-entity.service';

@Module({
  providers: [GifticonEntityService],
  exports: [GifticonEntityService],
  imports: [
    MongooseModule.forFeature([
      { name: Gifticon.name, schema: GifticonSchema },
    ]),
  ],
})
export class GifticonEntityModule {}
