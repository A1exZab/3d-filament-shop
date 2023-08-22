import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from 'src/common/guards';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { CheckUserDto } from 'src/user/dto/check-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body()
    userDto: CreateUserDto,
  ) {
    return this.authService.signUp(userDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() userDto: CheckUserDto) {
    return this.authService.signIn(userDto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signOut(@GetCurrentUserId() userId: string) {
    return this.authService.signOut(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
