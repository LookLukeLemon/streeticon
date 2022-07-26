import { StoreEntityModule } from '@entity/entity/store/store.module';
import { UserEntityModule } from '@entity/entity/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStoreAuthGuard } from './jwt/jwt-store-auth.guard';
import { JwtStoreStrategy } from './jwt/jwt-store.strategy';
import { JwtUserAuthGuard } from './jwt/jwt-user-auth.guard';
import { JwtUserStrategy } from './jwt/jwt-user.strategy';
import { RefreshJwtStoreAuthGuard } from './jwt/refresh-jwt-store-auth.guard';
import { RefreshJwtStoreStrategy } from './jwt/refresh-jwt-store.strategy';
import { RefreshJwtUserAuthGuard } from './jwt/refresh-jwt-user-auth.guard';
import { RefreshJwtUserStrategy } from './jwt/refresh-jwt-user.strategy';
import { LocalStoreStrategy } from './local/local-store.strategy';
import { LocalUserStrategy } from './local/local-user.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UserEntityModule,
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
    JwtStoreAuthGuard,
    JwtStoreStrategy,
    JwtUserAuthGuard,
    JwtUserStrategy,
    RefreshJwtStoreAuthGuard,
    RefreshJwtStoreStrategy,
    RefreshJwtUserAuthGuard,
    RefreshJwtUserStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
