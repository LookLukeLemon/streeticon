import { JwtStoreAuthGuard } from '@common/common/auth/jwt/jwt-store-auth.guard';
import { SignInDto } from '@common/common/auth/sign-in.dto';
import { Public } from '@common/common/constants';
import CreateStoreDto from '@entity/entity/store/dto/create.store.dto';
import UpdateStoreDto from '@entity/entity/store/dto/update.store.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() body: CreateStoreDto, @Res() res) {
    const newStore = await this.storeService.signUp(body);
    return res.status(HttpStatus.CREATED).json({
      newStore,
    });
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() body: SignInDto) {
    return this.storeService.signIn(body);
  }

  @UseGuards(JwtStoreAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.storeService.getStore(req);
  }

  @UseGuards(JwtStoreAuthGuard)
  @Patch('profile')
  updateProfile(@Body() body: UpdateStoreDto) {
    return this.storeService.updateStore(body);
  }
}
