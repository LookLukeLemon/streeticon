import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gifticon, GifticonSchema } from './gifticon.schema';
import { GifticonEntityService } from './gifticon.service';

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
