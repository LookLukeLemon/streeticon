import { AwsS3Module } from '@common/common/aws-s3/aws-s3.module';
import { GifticonEntityModule } from '@entity/entity/gifticon/gifticon.module';
import {
  Gifticon,
  GifticonSchema,
} from '@entity/entity/gifticon/gifticon.schema';
import { StoreEntityModule } from '@entity/entity/store/store.module';
import { Store, StoreSchema } from '@entity/entity/store/store.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GifticonController } from './gifticon.controller';
import { GifticonService } from './gifticon.service';

@Module({
  imports: [
    AwsS3Module,
    StoreEntityModule,
    GifticonEntityModule,
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: Gifticon.name, schema: GifticonSchema },
    ]),
  ],
  controllers: [GifticonController],
  providers: [GifticonService],
})
export class GifticonModule {}
