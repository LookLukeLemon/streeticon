import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload';
import { StoreEntityService } from '@entity/entity/store/store.service';

@Injectable()
export class JwtStoreStrategy extends PassportStrategy(Strategy, 'jwt-store') {
  constructor(
    private readonly configService: ConfigService,
    readonly storeEntityService: StoreEntityService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const store = await this.storeEntityService.findOneByBusinessId(
      payload.sub,
    );
    return store?.dto;
  }
}
