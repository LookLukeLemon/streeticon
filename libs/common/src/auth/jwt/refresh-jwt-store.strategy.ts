import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload';
import { StoreEntityService } from '@entity/entity/store/store.service';

@Injectable()
export class RefreshJwtStoreStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-store',
) {
  constructor(
    private readonly configService: ConfigService,
    readonly storeEntityService: StoreEntityService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.['jwt-store'];
        },
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req, payload: JwtPayload) {
    const refreshToken = req.cookies?.['jwt-store'];
    const foundStore = await this.storeEntityService.findOneByRefreshToken(
      refreshToken,
    );

    return foundStore?.dto;
  }
}
