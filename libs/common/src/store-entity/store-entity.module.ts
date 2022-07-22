import { Store, StoreSchema } from '@entity/entity/store/store.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreEntityService } from './store-entity.service';

@Module({
  providers: [StoreEntityService],
  exports: [StoreEntityService],
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
})
export class StoreEntityModule {}
