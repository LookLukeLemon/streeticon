import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntityService } from '../user-entity/user-entity.service';
import * as bcrypt from 'bcrypt';
import { Store } from '@entity/entity/store/store.schema';
import StoreDto from '@entity/entity/store/dto/store.dto';
import { StoreEntityService } from '../store-entity/store-entity.service';
import { Request, Response } from 'express';
import { JwtPayload } from './jwt/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userEntityService: UserEntityService,
    private storeEntityService: StoreEntityService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pwd: string): Promise<any> {
    const user = await this.userEntityService.findOne(name);

    if (user && user.password === pwd) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateStore(name: string, pwd: string): Promise<Store> {
    const store = await this.storeEntityService.findOneByName(name);
    if (!store) throw new NotFoundException();

    const isValid = await bcrypt.compare(pwd, store.password);

    if (isValid) {
      return store;
    } else {
      throw new UnauthorizedException();
    }
  }

  async signIn(user: any) {
    const payload = { name: user.name, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signOutStore(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundStore = await this.storeEntityService.findOneByRefreshToken(
      refreshToken,
    );

    if (!foundStore) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.sendStatus(204);
    }

    foundStore.refreshToken = foundStore.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );

    await this.storeEntityService.updateByBusinessId(
      foundStore.businessId,
      foundStore,
    );
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
  }

  async signInStore(req: Request, res: Response, store: StoreDto) {
    const cookies = req.cookies;
    const foundStore = await this.storeEntityService.findOneByBusinessId(
      store.businessId,
    );

    if (!foundStore) return res.sendStatus(401);

    const payload: JwtPayload = {
      name: store.name,
      sub: store.businessId,
      image: store.image,
    };

    const refreshPayload: JwtPayload = {
      name: store.name,
      sub: store.businessId,
      image: store.image,
    };

    const access_token = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(refreshPayload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    let newRefreshTokenArray = !cookies?.jwt
      ? foundStore.refreshToken
      : foundStore.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      /* Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      */
      const refreshToken = cookies.jwt;
      const foundToken = await this.storeEntityService.findOneByRefreshToken(
        refreshToken,
      );

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }

    // Saving refreshToken with current user
    foundStore.refreshToken = [...newRefreshTokenArray, newRefreshToken];

    const result = await this.storeEntityService.updateByBusinessId(
      foundStore.businessId,
      foundStore,
    );

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.setHeader('Authorization', 'Bearer ' + access_token);

    // Send authorization roles and access token to user
    return res.json({ access_token });
  }

  async refreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    const foundStore = await this.storeEntityService.findOneByRefreshToken(
      refreshToken,
    );

    // Detected refresh token reuse!
    if (!foundStore) {
      const verified = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });

      if (verified) {
        const hackedStore = await this.storeEntityService.findOneByBusinessId(
          verified.businessId,
        );

        hackedStore.refreshToken = [];

        const result = await this.storeEntityService.updateByBusinessId(
          hackedStore.businessId,
          hackedStore,
        );
      } else {
        return res.sendStatus(403);
      }
      return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundStore.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );

    const verified: JwtPayload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    if (!verified) {
      foundStore.refreshToken = [...newRefreshTokenArray];
      const result = await this.storeEntityService.updateByBusinessId(
        foundStore.businessId,
        foundStore,
      );
    } else {
      if (foundStore.businessId !== verified['sub']) {
        return res.sendStatus(403);
      }

      // Refresh token was still valid
      const payload: JwtPayload = {
        name: verified.name,
        sub: verified.sub,
        image: verified.image,
      };

      const refreshPayload: JwtPayload = {
        name: foundStore.name,
        sub: foundStore.businessId,
        image: foundStore.image,
      };

      const access_token = this.jwtService.sign(payload);
      const newRefreshToken = this.jwtService.sign(refreshPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });

      // Saving refreshToken with current store
      foundStore.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await this.storeEntityService.updateByBusinessId(
        foundStore.businessId,
        foundStore,
      );

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ access_token });
    }
  }
}
