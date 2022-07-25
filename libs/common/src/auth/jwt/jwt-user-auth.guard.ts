import { IS_PUBLIC_KEY } from '@common/common/constants';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('jwt-user') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

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
