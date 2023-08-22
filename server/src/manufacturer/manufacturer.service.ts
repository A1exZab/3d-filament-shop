import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Manufacturer, ManufacturerDocument } from './manufacturer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel(Manufacturer.name)
    private manufacturerModel: Model<ManufacturerDocument>,
  ) {}

  async getAllManufacturers(): Promise<ManufacturerDocument[]> {
    const manufacturers = await this.manufacturerModel.find();
    return manufacturers;
  }

  async getManufacturerById(manufacturerId): Promise<ManufacturerDocument> {
    const manufacturer = await this.manufacturerModel.findById(manufacturerId);
    return manufacturer;
  }

  async addManufacturer(
    manufacturerDto: CreateManufacturerDto,
  ): Promise<ManufacturerDocument> {
    try {
      const existingManufacturer = await this.manufacturerModel.findOne({
        name: manufacturerDto.name,
      });

      if (existingManufacturer) {
        throw new Error();
      }

      const newManufacturer = await this.manufacturerModel.create(
        manufacturerDto,
      );
      await newManufacturer.save();
      return newManufacturer;
    } catch (error) {
      throw new HttpException(
        'Производитель с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
