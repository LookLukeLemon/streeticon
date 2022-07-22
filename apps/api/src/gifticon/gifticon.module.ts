import { AwsS3Module } from '@common/common/aws-s3/aws-s3.module';
import { GifticonEntityModule } from '@common/common/gifticon-entity/gifticon-entity.module';
import { StoreEntityModule } from '@common/common/store-entity/store-entity.module';
import {
  Gifticon,
  GifticonSchema,
} from '@entity/entity/gifticon/gifticon.schema';
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
