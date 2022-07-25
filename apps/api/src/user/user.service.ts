import { SignInDto } from '@common/common/auth/sign-in.dto';
import { AwsS3Service } from '@common/common/aws-s3/aws-s3.service';
import { CipherService } from '@common/common/cipher/cipher.service';
import { UserEntityService } from '@common/common/user-entity/user-entity.service';
import CreateUserDto from '@entity/entity/user/dto/create.user.dto';
import UpdateUserDto from '@entity/entity/user/dto/update.user.dto';
import UpdateUserImageDto from '@entity/entity/user/dto/update.user.image';
import UserDto from '@entity/entity/user/dto/user.dto';
import { User } from '@entity/entity/user/user.schema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly userEntityService: UserEntityService,
    private readonly awsS3Service: AwsS3Service,
    private readonly cipherService: CipherService,
  ) {}

  async signUp(body: CreateUserDto): Promise<User> {
    const hashedPwd = await this.cipherService.hash(body.password);
    const user = new User();
    user.email = body.email;
    user.name = body.name;
    user.nickname = body.nickname;
    user.password = hashedPwd;
    user.country = body.country;
    user.region = body.region;

    return await this.userEntityService.create(user);
  }

  async signIn(body: SignInDto): Promise<UserDto> {
    const { id, password } = body;

    const foundUser = await this.userEntityService.findOneByEmail(id);

    if (!foundUser) {
      throw new NotFoundException(
        'The registration information does not exist.',
      );
    }

    const isValid = await this.cipherService.isHashValid(
      password,
      foundUser.password,
    );

    if (isValid) {
      return foundUser.dto;
    } else {
      throw new BadRequestException('password not matched');
    }
  }

  async getUser(req: Request) {
    const cookies = req.cookies;

    if (cookies?.['jwt-user']) {
      const refreshToken = cookies['jwt-user'];
      const foundUser = await this.userEntityService.findOneByRefreshToken(
        refreshToken,
      );

      return foundUser.dto;
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateUser(body: UpdateUserDto) {
    const foundUser = await this.userEntityService.findOneByEmail(body.email);

    if (!foundUser) throw new ConflictException();

    foundUser.phone = body.phone ?? foundUser.phone;
    foundUser.address = body.address ?? foundUser.address;
    foundUser.nickname = body.nickname ?? foundUser.nickname;

    return await this.userEntityService.updateById(foundUser._id, foundUser);
  }

  async updateImage(body: UpdateUserImageDto) {
    const foundUser = await this.userEntityService.findOneByEmail(body.email);

    if (!foundUser) throw new ConflictException();

    if (body.thumbnailBase64) {
      const { key } = await this.awsS3Service.uploadImageFromBase64(
        body.thumbnailBase64,
      );

      if (key) {
        foundUser.image = key;
      }
    }

    return await this.userEntityService.updateById(foundUser._id, foundUser);
  }
}
