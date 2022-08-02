import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import UserDto from '@entity/entity/user/dto/user.dto';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(name: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user.dto;
  }
}
