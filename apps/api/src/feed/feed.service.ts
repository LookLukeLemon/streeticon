import { AwsS3Service } from '@common/common/aws-s3/aws-s3.service';
import CreateFeedDto from '@entity/entity/feed/dto/create.feed.dto';
import { Feed } from '@entity/entity/feed/feed.schema';
import { FeedEntityService } from '@entity/entity/feed/feed.service';
import UserDto from '@entity/entity/user/dto/user.dto';
import { UserEntityService } from '@entity/entity/user/user.service';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly userEntityService: UserEntityService,
    private readonly feedEntityService: FeedEntityService,
  ) {}

  async postFeed(body: CreateFeedDto, user: UserDto): Promise<Feed> {
    const foundUser = await this.userEntityService.findOneByEmail(user.email);

    try {
      const { key } = await this.awsS3Service.uploadImageFromBase64(body.image);
      const newFeed = new Feed(body.desc, key, foundUser._id);
      return await this.feedEntityService.create(newFeed);
    } catch (err) {
      throw new HttpException('Failed to add feed', 500);
    }
  }

  async findAll(page: number, perPage: number) {
    return await this.feedEntityService.findAll(page, perPage);
  }
}
