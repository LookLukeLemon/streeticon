import { JwtUserAuthGuard } from '@common/common/auth/jwt/jwt-user-auth.guard';
import { SignInDto } from '@common/common/auth/sign-in.dto';
import { Public } from '@common/common/constants';
import CreateUserDto from '@entity/entity/user/dto/create.user.dto';
import UpdateUserDto from '@entity/entity/user/dto/update.user.dto';
import UpdateUserImageDto from '@entity/entity/user/dto/update.user.image';
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
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}
  @Public()
  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto, @Res() res) {
    const newUser = await this.userService.signUp(body);
    return res.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() body: SignInDto) {
    return this.userService.signIn(body);
  }

  @UseGuards(JwtUserAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.userService.getUser(req);
  }

  @UseGuards(JwtUserAuthGuard)
  @Patch('profile')
  updateProfile(@Body() body: UpdateUserDto) {
    return this.userService.updateUser(body);
  }

  @UseGuards(JwtUserAuthGuard)
  @Patch('profile/image')
  updateProfileImage(@Body() body: UpdateUserImageDto) {
    return this.userService.updateImage(body);
  }
}
