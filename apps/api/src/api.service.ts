import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getHello(): string {
    return `API Hello World! ${process.env.NODE_ENV}`;
  }
}
