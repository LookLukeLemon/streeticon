import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StoreEntityModule } from '../store-entity/store-entity.module';
import { UserEntityModule } from '../user-entity/user-entity.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RefreshJwtStrategy } from './jwt/refresh-jwt.strategy';
import { LocalStoreStrategy } from './local/local-store.strategy';
import { LocalUserStrategy } from './local/local-user.strategy';

@Module({
  imports: [
    UserEntityModule,
    PassportModule,
    ConfigModule,
    StoreEntityModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalUserStrategy,
    LocalStoreStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
