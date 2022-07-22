import { JwtAuthGuard } from '@common/common/auth/jwt/jwt-auth.guard';
import CreateGifticonDto from '@entity/entity/gifticon/dto/create.gifticon.dto';
import UpdateGifticonDto from '@entity/entity/gifticon/dto/update.gifticon.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { GifticonService } from './gifticon.service';

@Controller('gifticon')
export class GifticonController {
  constructor(private readonly gifticonService: GifticonService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addGifticon(@Body() body: CreateGifticonDto, @Req() req, @Res() res) {
    const newGifticon = await this.gifticonService.addGifticon(body, req.user);
    return res.status(HttpStatus.CREATED).json({
      newGifticon,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateGifticon(
    @Body() body: UpdateGifticonDto,
    @Req() req,
    @Res() res,
  ) {
    const updateResult: UpdateWriteOpResult =
      await this.gifticonService.updateGifticon(body, req.user);

    return res.status(HttpStatus.NO_CONTENT).json({
      msg:
        updateResult.matchedCount > 0
          ? 'Success to update'
          : 'There is no matched items to update',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findGiftcards(
    @Req() req,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.gifticonService.findAll(req.user, page, perPage);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  findGiftcard(@Req() req, @Param('name') name: string) {
    return this.gifticonService.findOne(req.user, name);
  }
}
