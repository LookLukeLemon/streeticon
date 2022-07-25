import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StoreEntityService } from '@common/common/store-entity/store-entity.service';
import { JwtPayload } from './jwt-payload';
import { UserEntityService } from '@common/common/user-entity/user-entity.service';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    private readonly configService: ConfigService,
    readonly userEntityService: UserEntityService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userEntityService.findOneByEmail(payload.sub);
    return user?.dto;
  }
}
