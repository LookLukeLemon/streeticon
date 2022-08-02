import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class RefreshJwtStoreAuthGuard extends AuthGuard('jwt-refresh-store') {
  handleRequest(err, user, info) {
    const jwtExpired = info instanceof TokenExpiredError;
    if (jwtExpired) {
      throw new ForbiddenException();
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
