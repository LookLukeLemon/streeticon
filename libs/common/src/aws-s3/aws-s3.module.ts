import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AwsS3Service],
  exports: [AwsS3Service],
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class AwsS3Module {}
