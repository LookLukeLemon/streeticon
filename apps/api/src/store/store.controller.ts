import { JwtAuthGuard } from '@common/common/auth/jwt/jwt-auth.guard';
import { CipherService } from '@common/common/cipher/cipher.service';
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
import { IsNotEmpty, IsString } from 'class-validator';
import { Request } from 'express';
import { StoreService } from './store.service';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.storeService.getStore(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Body() body: UpdateStoreDto) {
    return this.storeService.updateStore(body);
  }
}
