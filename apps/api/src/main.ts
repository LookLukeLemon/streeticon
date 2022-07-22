import { AllExceptionsFilter } from '@common/common/exception-filter/all-exceptions.filter';
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { ApiModule } from './api.module';
import * as cookieParser from 'cookie-parser';

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://streeticon.netlify.app',
];

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        console.log('Success cors request', origin);
        callback(null, true);
      } else {
        console.log('Failed cors request', origin);
        callback(new UnauthorizedException('Not allowed by CORS'));
      }
    },
  });

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
