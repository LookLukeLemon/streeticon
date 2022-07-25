import { AuthService } from '@common/common/auth/auth.service';
import { JwtStoreAuthGuard } from '@common/common/auth/jwt/jwt-store-auth.guard';
import { JwtUserAuthGuard } from '@common/common/auth/jwt/jwt-user-auth.guard';
import { RefreshJwtStoreAuthGuard } from '@common/common/auth/jwt/refresh-jwt-store-auth.guard';
import { RefreshJwtUserAuthGuard } from '@common/common/auth/jwt/refresh-jwt-user-auth.guard';
import { LocalStoreAuthGuard } from '@common/common/auth/local/store-auth.guard';
import { LocalUserAuthGuard } from '@common/common/auth/local/user-auth.guard';
import { Public } from '@common/common/constants';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Public()
  @UseGuards(LocalUserAuthGuard)
  @Post('auth/user/sign-in')
  async signInUser(@Req() req, @Res() res: Response) {
    return await this.authService.signInUser(req, res, req.user);
  }

  @Public()
  @UseGuards(JwtUserAuthGuard)
  @Get('auth/user/sign-out')
  async signOutUser(@Req() req: Request, @Res() res: Response) {
    return await this.authService.signOutUser(req, res);
  }

  @UseGuards(RefreshJwtUserAuthGuard)
  @Get('auth/user/refresh')
  async refreshUser(@Req() req: Request, @Res() res: Response) {
    return await this.authService.refreshTokenUser(req, res);
  }

  @Public()
  @UseGuards(LocalStoreAuthGuard)
  @Post('auth/store/sign-in')
  async signInStore(@Req() req, @Res() res: Response) {
    return await this.authService.signInStore(req, res, req.user);
  }

  @Public()
  @UseGuards(JwtStoreAuthGuard)
  @Get('auth/store/sign-out')
  async signOutStore(@Req() req: Request, @Res() res: Response) {
    return await this.authService.signOutStore(req, res);
  }

  @UseGuards(RefreshJwtStoreAuthGuard)
  @Get('auth/store/refresh')
  async refreshStore(@Req() req: Request, @Res() res: Response) {
    return await this.authService.refreshTokenStore(req, res);
  }
}
