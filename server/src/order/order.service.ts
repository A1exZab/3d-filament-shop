import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async getNewOrder(userId): Promise<OrderDocument> {
    const newOrder = await this.orderModel.findOne({
      $and: [{ userId: { $eq: userId } }, { status: { $eq: 'NEW' } }],
    });

    return newOrder;
  }

  async getCompletedOrders(userId: string): Promise<OrderDocument[]> {
    const completedOrders = await this.orderModel.find({
      $and: [{ userId: { $eq: userId } }, { status: { $eq: 'PROCESSED' } }],
    });

    return completedOrders;
  }

  async createOrder(orderDto: CreateOrderDto): Promise<OrderDocument> {
    const existingOrder = await this.orderModel.findOne({
      $and: [{ userId: { $eq: orderDto.userId } }, { status: { $eq: 'NEW' } }],
    });

    if (!existingOrder) {
      const newOrder = await this.orderModel.create({
        ...orderDto,
        status: 'NEW',
      });
      await newOrder.save();

      return newOrder;
    }

    return existingOrder;
  }

  async updateOrder(
    orderId: string,
    ordertDto: UpdateOrderDto,
  ): Promise<OrderDocument> {
    try {
      const updatedOrder = await this.orderModel.findByIdAndUpdate(
        orderId,
        {
          ...ordertDto,
        },
        { returnDocument: 'after' },
      );

      return updatedOrder;
    } catch (error) {
      throw new HttpException(
        'При оформлении заказа произошла ошибка',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
