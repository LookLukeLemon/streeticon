import { AuthService } from '@common/common/auth/auth.service';
import { JwtAuthGuard } from '@common/common/auth/jwt/jwt-auth.guard';
import { RefreshJwtAuthGuard } from '@common/common/auth/jwt/refresh-jwt-auth.guard';
import { StoreAuthGuard } from '@common/common/auth/local/store-auth.guard';
import { UserAuthGuard } from '@common/common/auth/local/user-auth.guard';
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
  @UseGuards(UserAuthGuard)
  @Post('auth/sign-in')
  signIn(@Req() req) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @UseGuards(StoreAuthGuard)
  @Post('auth/store/sign-in')
  async signInStore(@Req() req, @Res() res: Response) {
    return await this.authService.signInStore(req, res, req.user);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get('auth/store/sign-out')
  async signOutStore(@Req() req: Request, @Res() res: Response) {
    return await this.authService.signOutStore(req, res);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Get('auth/store/refresh')
  async refreshStore(@Req() req: Request, @Res() res: Response) {
    return await this.authService.refreshToken(req, res);
  }
}
