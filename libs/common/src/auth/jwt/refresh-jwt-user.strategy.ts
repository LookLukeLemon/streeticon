import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload';
import { UserEntityService } from '@common/common/user-entity/user-entity.service';

@Injectable()
export class RefreshJwtUserStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-user',
) {
  constructor(
    readonly configService: ConfigService,
    readonly userEntityService: UserEntityService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.['jwt-user'];
        },
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req, payload: JwtPayload) {
    const refreshToken = req.cookies?.['jwt-user'];
    const foundUser = await this.userEntityService.findOneByRefreshToken(
      refreshToken,
    );

    return foundUser?.dto;
  }
}
