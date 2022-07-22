import { AwsS3Service } from '@common/common/aws-s3/aws-s3.service';
import { GifticonEntityService } from '@common/common/gifticon-entity/gifticon-entity.service';
import { StoreEntityService } from '@common/common/store-entity/store-entity.service';
import CreateGifticonDto from '@entity/entity/gifticon/dto/create.gifticon.dto';
import UpdateGifticonDto from '@entity/entity/gifticon/dto/update.gifticon.dto';
import { Gifticon } from '@entity/entity/gifticon/gifticon.schema';
import StoreDto from '@entity/entity/store/dto/store.dto';

import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class GifticonService {
  constructor(
    private readonly awsS3Service: AwsS3Service,
    private readonly storeEntityService: StoreEntityService,
    private readonly gifticonEntityService: GifticonEntityService,
  ) {}

  async addGifticon(
    body: CreateGifticonDto,
    store: StoreDto,
  ): Promise<Gifticon> {
    const foundStore = await this.storeEntityService.findOneByBusinessId(
      store.businessId,
    );

    const gifticon = new Gifticon();
    gifticon.storeId = foundStore._id;
    gifticon.name = body.name;
    gifticon.desc = body.desc;
    gifticon.price = body.price;
    gifticon.totalCount = body.totalCount;

    const uploadResults = await Promise.allSettled(
      body.images.map(async (i) => {
        const { key } = await this.awsS3Service.uploadImageFromBase64(i);

        return key;
      }),
    );

    if (uploadResults?.length > 0) {
      uploadResults
        .filter((ur) => ur.status === 'fulfilled')
        .map((ur, idx) => {
          const fulfillResult = ur as PromiseFulfilledResult<string>;

          if (idx === 0) {
            gifticon.image1 = fulfillResult.value;
          } else if (idx === 1) {
            gifticon.image2 = fulfillResult.value;
          } else if (idx === 2) {
            gifticon.image3 = fulfillResult.value;
          } else if (idx === 3) {
            gifticon.image4 = fulfillResult.value;
          } else if (idx === 4) {
            gifticon.image5 = fulfillResult.value;
          }
        });

      return await this.gifticonEntityService.create(gifticon);
    } else {
      throw new HttpException('Failed to add gifticon', 500);
    }
  }

  async updateGifticon(
    body: UpdateGifticonDto,
    store: StoreDto,
  ): Promise<UpdateWriteOpResult> {
    const foundStore = await this.storeEntityService.findOneByBusinessId(
      store.businessId,
    );

    const foundGifticon =
      await this.gifticonEntityService.findOneByNameWithStoreId(
        body.name,
        foundStore.id,
      );

    if (foundGifticon.storeId.toString() !== foundStore.id)
      throw new UnauthorizedException();

    foundGifticon.desc = body.desc;
    foundGifticon.price = body.price;
    foundGifticon.totalCount = body.totalCount;

    const uploadResults = await Promise.allSettled(
      body.images.map(async (i) => {
        const { key } = await this.awsS3Service.uploadImageFromBase64(i);

        return key;
      }),
    );

    if (uploadResults?.length > 0) {
      uploadResults
        .filter((ur) => ur.status === 'fulfilled')
        .map((ur, idx) => {
          const fulfillResult = ur as PromiseFulfilledResult<string>;

          if (idx === 0) {
            foundGifticon.image1 = fulfillResult.value;
          } else if (idx === 1) {
            foundGifticon.image2 = fulfillResult.value;
          } else if (idx === 2) {
            foundGifticon.image3 = fulfillResult.value;
          } else if (idx === 3) {
            foundGifticon.image4 = fulfillResult.value;
          } else if (idx === 4) {
            foundGifticon.image5 = fulfillResult.value;
          }
        });

      return await this.gifticonEntityService.update(
        foundGifticon.id,
        foundGifticon,
      );
    } else {
      throw new HttpException('Failed to add gifticon', 500);
    }
  }

  async findAll(store: StoreDto, page: number, perPage: number) {
    if (!store) throw new UnauthorizedException();

    const foundStore = await this.storeEntityService.findOneByBusinessId(
      store.businessId,
    );

    if (!foundStore) throw new ConflictException();

    return await this.gifticonEntityService.findAll(
      foundStore._id,
      page,
      perPage,
    );
  }

  async findOne(store: StoreDto, name: string) {
    if (!store) throw new UnauthorizedException();

    const foundStore = await this.storeEntityService.findOneByBusinessId(
      store.businessId,
    );

    if (!foundStore) throw new ConflictException();

    return await this.gifticonEntityService.findOneByNameWithStoreId(
      name,
      foundStore._id,
    );
  }
}
