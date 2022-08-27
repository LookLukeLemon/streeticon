import StoreDto from '@entity/entity/store/dto/store.dto';
import { Store } from '@entity/entity/store/store.schema';
import { StoreEntityService } from '@entity/entity/store/store.service';
import UserDto from '@entity/entity/user/dto/user.dto';
import { User } from '@entity/entity/user/user.schema';
import { UserEntityService } from '@entity/entity/user/user.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtPayload } from './jwt/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private userEntityService: UserEntityService,
    private storeEntityService: StoreEntityService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pwd: string): Promise<User> {
    const user = await this.userEntityService.findOneByEmail(email);
    if (!user) throw new NotFoundException();

    const isValid = await bcrypt.compare(pwd, user.password);

    if (isValid) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
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

  //공통 Local 로긴
  async signIn(user: any) {
    const payload = { name: user.name, sub: user.businessId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signOutUser(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.['jwt-user']) return res.sendStatus(204);
    const refreshToken = cookies['jwt-user'];

    const foundUser = await this.userEntityService.findOneByRefreshToken(
      refreshToken,
    );

    if (!foundUser) {
      res.clearCookie('jwt-user', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.sendStatus(204);
    }

    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );

    await this.userEntityService.updateByEmail(foundUser.email, foundUser);
    res.clearCookie('jwt-user', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.sendStatus(204);
  }

  async signInUser(req: Request, res: Response, user: UserDto) {
    const cookies = req.cookies;
    const foundUser = await this.userEntityService.findOneByEmail(user.email);

    if (!foundUser) return res.sendStatus(401);

    const payload: JwtPayload = {
      name: user.name,
      sub: user.email,
      image: user.image,
    };

    const refreshPayload: JwtPayload = {
      name: user.name,
      sub: user.email,
      image: user.image,
    };

    const access_token = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(refreshPayload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    let newRefreshTokenArray = !cookies?.['jwt-user']
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies['jwt-user']);

    if (cookies?.['jwt-user']) {
      /* Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      */
      const refreshToken = cookies['jwt-user'];
      const foundToken = await this.userEntityService.findOneByRefreshToken(
        refreshToken,
      );

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt-user', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

    const result = await this.userEntityService.updateByEmail(
      foundUser.email,
      foundUser,
    );

    // Creates Secure Cookie with refresh token
    res.cookie('jwt-user', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.setHeader('Authorization', 'Bearer ' + access_token);

    // Send authorization roles and access token to user
    return res.json({ access_token });
  }

  async refreshTokenUser(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.['jwt-user']) return res.sendStatus(401);
    const refreshToken = cookies['jwt-user'];
    res.clearCookie('jwt-user', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    const foundUser = await this.userEntityService.findOneByRefreshToken(
      refreshToken,
    );

    // Detected refresh token reuse!
    if (!foundUser) {
      const verified = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });

      if (verified) {
        const hackedUser = await this.userEntityService.findOneByEmail(
          verified.email,
        );

        hackedUser.refreshToken = [];

        const result = await this.userEntityService.updateByEmail(
          hackedUser.email,
          hackedUser,
        );
      } else {
        return res.sendStatus(403);
      }
      return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );

    const verified: JwtPayload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });

    if (!verified) {
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = await this.userEntityService.updateByEmail(
        foundUser.email,
        foundUser,
      );
    } else {
      if (foundUser.email !== verified['sub']) {
        return res.sendStatus(403);
      }

      // Refresh token was still valid
      const payload: JwtPayload = {
        name: verified.name,
        sub: verified.sub,
        image: verified.image,
      };

      const refreshPayload: JwtPayload = {
        name: foundUser.name,
        sub: foundUser.email,
        image: foundUser.image,
      };

      const access_token = this.jwtService.sign(payload);
      const newRefreshToken = this.jwtService.sign(refreshPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });

      // Saving refreshToken with current store
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await this.userEntityService.updateByEmail(
        foundUser.email,
        foundUser,
      );

      // Creates Secure Cookie with refresh token
      res.cookie('jwt-user', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ access_token });
    }
  }

  async signOutStore(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.['jwt-store']) return res.sendStatus(204);
    const refreshToken = cookies['jwt-store'];

    const foundStore = await this.storeEntityService.findOneByRefreshToken(
      refreshToken,
    );

    if (!foundStore) {
      res.clearCookie('jwt-store', {
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
    res.clearCookie('jwt-store', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
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

    let newRefreshTokenArray = !cookies?.['jwt-store']
      ? foundStore.refreshToken
      : foundStore.refreshToken.filter((rt) => rt !== cookies['jwt-store']);

    if (cookies?.['jwt-store']) {
      /* Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      */
      const refreshToken = cookies['jwt-store'];
      const foundToken = await this.storeEntityService.findOneByRefreshToken(
        refreshToken,
      );

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt-store', {
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
    res.cookie('jwt-store', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.setHeader('Authorization', 'Bearer ' + access_token);

    // Send authorization roles and access token to user
    return res.json({ access_token });
  }

  async refreshTokenStore(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.['jwt-store']) return res.sendStatus(401);
    const refreshToken = cookies['jwt-store'];
    res.clearCookie('jwt-store', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
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
      res.cookie('jwt-store', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ access_token });
    }
  }
}
