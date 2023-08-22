import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery, DeliveryDocument } from './delivery.schema';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery.name) private deliveryModel: Model<DeliveryDocument>,
  ) {}

  async getAll(): Promise<DeliveryDocument[]> {
    const deliveries = await this.deliveryModel.find();
    return deliveries;
  }

  async addDeliveryMethod(
    deliveryDto: CreateDeliveryDto,
  ): Promise<DeliveryDocument> {
    try {
      const existingDelivery = await this.deliveryModel.findOne({
        name: deliveryDto.name,
      });

      if (existingDelivery) {
        throw new Error();
      }

      const newDelivery = await this.deliveryModel.create(deliveryDto);

      await newDelivery.save();

      return newDelivery;
    } catch (error) {
      throw new HttpException(
        'Способ доставки с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
