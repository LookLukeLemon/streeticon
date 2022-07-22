import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AwsS3Service {
  AWS_S3_BUCKET;
  AWS_REGION;
  client: S3Client;

  constructor(
    readonly configService: ConfigService,
    readonly httpService: HttpService,
  ) {
    this.AWS_S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
    this.AWS_REGION = this.configService.get('AWS_S3_REGION');

    this.client = new S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  base64MimeType(encoded: string) {
    let result = null;

    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result;
  }

  async uploadImageFromBase64(base64Img: string) {
    try {
      const mime = this.base64MimeType(base64Img);
      const onlyContentBase64 = base64Img.split(',')[1];
      const buf = await Buffer.from(onlyContentBase64, 'base64');
      const mimeInfo = mime.split('/');
      const ext = mimeInfo[1];
      const key = `${uuidv4()}${ext}`;

      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: key,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: ext,
      };
      const multipartUpload = new Upload({
        client: this.client,
        params,
      });

      multipartUpload.on('httpUploadProgress', (progress) => {
        console.log(progress);
      });

      await multipartUpload.done();
      const location = `https://${this.AWS_S3_BUCKET}.s3.${this.AWS_REGION}.amazonaws.com/${key}`;

      return { location, key };
    } catch (err) {
      throw err;
    }
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const ext = extname(file.originalname);
      const key = `${uuidv4()}${extname(file.originalname)}`;

      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentEncoding: 'base64',
        ContentType: ext,
      };

      const multipartUpload = new Upload({
        client: this.client,
        params,
      });

      multipartUpload.on('httpUploadProgress', (progress) => {
        console.log(progress);
      });

      await multipartUpload.done();
      const location = `https://${this.AWS_S3_BUCKET}.s3.${this.AWS_REGION}.amazonaws.com/${key}`;

      return { location, key };
    } catch (err) {
      throw err;
    }
  }
}
