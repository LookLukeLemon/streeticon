import { JwtUserAuthGuard } from '@common/common/auth/jwt/jwt-user-auth.guard';
import CreateFeedCommentDto from '@entity/entity/feed-comment/dto/create.feed-comment.dto';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Console } from 'console';
import { FeedCommentService } from './feed-comment.service';

@Controller('feed-comment')
export class FeedCommentController {
  constructor(readonly feedCommentService: FeedCommentService) {}
  @UseGuards(JwtUserAuthGuard)
  @Post()
  async postComment(
    @Body() body: CreateFeedCommentDto,
    @Req() req,
    @Res() res,
  ) {
    const newFeedComment = await this.feedCommentService.postComment(
      body,
      req.user,
    );
    return res.status(HttpStatus.CREATED).json(newFeedComment);
  }
}
