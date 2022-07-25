import { AwsS3Module } from '@common/common/aws-s3/aws-s3.module';
import { CipherModule } from '@common/common/cipher/cipher.module';
import { UserEntityModule } from '@common/common/user-entity/user-entity.module';
import { User, UserSchema } from '@entity/entity/user/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    AwsS3Module,
    CipherModule,
    UserEntityModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
})
export class UserModule {}
