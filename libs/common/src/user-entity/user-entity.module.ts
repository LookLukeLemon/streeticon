import { User, UserSchema } from '@entity/entity/user/user.schema';
import { Module } from '@nestjs/common';
import { UserEntityService } from './user-entity.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [UserEntityService],
  exports: [UserEntityService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserEntityModule {}
