import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Color, ColorDocument } from './color.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color.name) private colorModel: Model<ColorDocument>,
  ) {}

  async getAllColors(): Promise<ColorDocument[]> {
    try {
      return await this.colorModel.find();
    } catch (error) {
      throw new HttpException(
        'При получении данных произошла ошибка',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getColorById(colorId): Promise<ColorDocument> {
    const color = await this.colorModel.findById(colorId);
    return color;
  }

  async addColor(colorDto: CreateColorDto): Promise<ColorDocument> {
    try {
      const existingColor = await this.colorModel.findOne({
        name: colorDto.name,
      });

      if (existingColor) {
        throw new Error();
      }

      const newColor = await this.colorModel.create(colorDto);
      await newColor.save();

      return newColor;
    } catch (error) {
      throw new HttpException(
        'Цвет с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
