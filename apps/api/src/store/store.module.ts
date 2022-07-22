import { AwsS3Module } from '@common/common/aws-s3/aws-s3.module';
import { CipherModule } from '@common/common/cipher/cipher.module';
import { StoreEntityModule } from '@common/common/store-entity/store-entity.module';
import {
  Gifticon,
  GifticonSchema,
} from '@entity/entity/gifticon/gifticon.schema';
import { Store, StoreSchema } from '@entity/entity/store/store.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  controllers: [StoreController],
  imports: [
    AwsS3Module,
    CipherModule,
    StoreEntityModule,
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: Gifticon.name, schema: GifticonSchema },
    ]),
  ],
  providers: [StoreService],
})
export class StoreModule {}
