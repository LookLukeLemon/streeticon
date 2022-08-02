import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { AuthModule } from './auth/auth.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { CipherService } from './cipher/cipher.service';
import { CipherModule } from './cipher/cipher.module';

@Module({
  providers: [CommonService, CipherService],
  exports: [CommonService],
  imports: [AuthModule, AwsS3Module, CipherModule],
})
export class CommonModule {}
