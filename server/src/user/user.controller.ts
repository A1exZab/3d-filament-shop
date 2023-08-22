import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('/:email')
  getByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get('/:userId')
  getById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Patch('/:userId')
  update(@Param('userId') userId: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(userId, userDto);
  }
}
