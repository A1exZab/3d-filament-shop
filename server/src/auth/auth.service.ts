import {
  Injectable,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload, Tokens } from './types';
import { CheckUserDto } from 'src/user/dto/check-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: CreateUserDto): Promise<Tokens> {
    const existingUser = await this.userService.getUserByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await argon.hash(userDto.password);

    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const { accessToken, refreshToken } = await this.getTokens(
      newUser.firstName,
      newUser.lastName,
      newUser.userId,
      newUser.email,
      newUser.role,
    );

    await this.updateRefreshHash(newUser.userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(userDto: CheckUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new HttpException(
        'Некорректный email или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordMatches = await argon.verify(user.password, userDto.password);

    if (!passwordMatches) {
      throw new HttpException(
        'Некорректный email или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { accessToken, refreshToken } = await this.getTokens(
      user.firstName,
      user.lastName,
      user.userId,
      user.email,
      user.role,
    );

    await this.updateRefreshHash(user.userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signOut(userId: string): Promise<void> {
    await this.userService.updateUser(userId, { refreshToken: null });
  }

  async refreshTokens(userId: string, refresh: string): Promise<Tokens> {
    const user = await this.userService.getUserById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Необходима повторная авторизация');

    const refreshMatches = await argon.verify(user.refreshToken, refresh);
    if (!refreshMatches)
      throw new ForbiddenException('Необходима повторная авторизация');

    const { accessToken, refreshToken } = await this.getTokens(
      user.firstName,
      user.lastName,
      user.userId,
      user.email,
      user.role,
    );
    await this.updateRefreshHash(user.userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshHash(userId: string, refresh: string): Promise<void> {
    const hashRefresh = await argon.hash(refresh);
    await this.userService.updateUser(userId, { refreshToken: hashRefresh });
  }

  async getTokens(
    firstName: string,
    lastName: string,
    userId: string,
    email: string,
    role: 'USER' | 'ADMIN',
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      firstName,
      lastName,
      userId,
      email,
      role,
    };

    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_KEY,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_KEY,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: access,
      refreshToken: refresh,
    };
  }
}
