import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import StoreDto from '@entity/entity/store/dto/store.dto';

@Injectable()
export class LocalStoreStrategy extends PassportStrategy(Strategy, 'store') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<StoreDto> {
    const store = await this.authService.validateStore(username, password);
    if (!store) {
      throw new UnauthorizedException();
    }

    return store.dto;
  }
}
