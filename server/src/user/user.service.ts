import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<UserDocument[]> {
    const user = await this.userModel.find();
    return user;
  }

  async getUser(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne(
      { email },
      { _id: false, password: false },
    );
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserById(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findOne(
      { userId },
      { _id: false, password: false },
    );
    return user;
  }

  async createUser(userDto: CreateUserDto): Promise<UserDocument> {
    const user = await this.userModel.create({
      userId: uuidv4(),
      role: userDto.role || 'USER',
      ...userDto,
    });
    await user.save();
    return user;
  }

  async updateUser(
    userId: string,
    userDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { userId },
      userDto,
    );

    return updatedUser;
  }
}
