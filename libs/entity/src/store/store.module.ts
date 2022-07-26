import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './store.schema';
import { StoreEntityService } from './store.service';

@Module({
  providers: [StoreEntityService],
  exports: [StoreEntityService],
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
})
export class StoreEntityModule {}
