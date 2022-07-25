import { SignInDto } from '@common/common/auth/sign-in.dto';
import { AwsS3Service } from '@common/common/aws-s3/aws-s3.service';
import { CipherService } from '@common/common/cipher/cipher.service';
import { StoreEntityService } from '@common/common/store-entity/store-entity.service';
import CreateStoreDto from '@entity/entity/store/dto/create.store.dto';
import StoreDto from '@entity/entity/store/dto/store.dto';
import UpdateStoreDto from '@entity/entity/store/dto/update.store.dto';
import { Store } from '@entity/entity/store/store.schema';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeEntityService: StoreEntityService,
    private readonly awsS3Service: AwsS3Service,
    private readonly cipherService: CipherService,
  ) {}

  async signUp(body: CreateStoreDto): Promise<Store> {
    const hashedPwd = await this.cipherService.hash(body.password);
    const store = new Store();
    store.businessId = body.businessId;
    store.name = body.name;
    store.password = hashedPwd;
    store.category = body.category;
    store.desc = body.desc;
    store.phone = body.phone;
    store.address = body.address;

    if (body.thumbnailBase64) {
      const { key } = await this.awsS3Service.uploadImageFromBase64(
        body.thumbnailBase64,
      );

      if (key) {
        store.image = key;
        return await this.storeEntityService.create(store);
      }
    }

    throw new HttpException('Failed to sign-up', 500);
  }

  async signIn(body: SignInDto): Promise<StoreDto> {
    const { id, password } = body;

    const foundStore = await this.storeEntityService.findOneByName(id);

    if (!foundStore) {
      throw new NotFoundException(
        'The registration information does not exist.',
      );
    }

    const isValid = await this.cipherService.isHashValid(
      password,
      foundStore.password,
    );

    if (isValid) {
      return foundStore.dto;
    } else {
      throw new BadRequestException('password not matched');
    }
  }

  async getStore(req: Request) {
    const cookies = req.cookies;

    if (cookies?.['jwt-store']) {
      const refreshToken = cookies['jwt-store'];
      const foundStore = await this.storeEntityService.findOneByRefreshToken(
        refreshToken,
      );

      return foundStore.dto;
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateStore(body: UpdateStoreDto) {
    const foundStore = await this.storeEntityService.findOneByBusinessId(
      body.businessId,
    );

    if (!foundStore) throw new ConflictException();

    foundStore.category = body.category ?? foundStore.category;
    foundStore.desc = body.desc ?? foundStore.desc;
    foundStore.phone = body.phone ?? foundStore.phone;
    foundStore.address = body.address ?? foundStore.address;

    if (body.thumbnailBase64) {
      const { key } = await this.awsS3Service.uploadImageFromBase64(
        body.thumbnailBase64,
      );

      if (key) {
        foundStore.image = key;
      }
    }

    return await this.storeEntityService.updateById(foundStore._id, foundStore);
  }
}
