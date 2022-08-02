import { JwtUserAuthGuard } from '@common/common/auth/jwt/jwt-user-auth.guard';
import CreateFeedDto from '@entity/entity/feed/dto/create.feed.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(readonly feedService: FeedService) {}

  @UseGuards(JwtUserAuthGuard)
  @Post()
  async postFeed(@Body() body: CreateFeedDto, @Req() req, @Res() res) {
    const newFeed = await this.feedService.postFeed(body, req.user);
    return res.status(HttpStatus.CREATED).json({
      newFeed,
    });
  }

  @Get()
  findAll(@Query('page') page: number, @Query('perPage') perPage: number) {
    if (!(page > 0 && perPage > 0))
      throw new BadRequestException('should provide valid page, perPage');

    return this.feedService.findAll(page, perPage);
  }
}
