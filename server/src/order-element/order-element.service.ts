import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderElement, OrderElementDocument } from './order-element.schema';
import { CreateOrderElementDto } from './dto/create-order-element';
import { UpdateOrderElementDto } from './dto/update-order-element';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderElementService {
  constructor(
    @InjectModel(OrderElement.name)
    private orderElementModel: Model<OrderElementDocument>,
    private productService: ProductService,
  ) {}

  async getByIds(
    orderId: string,
    productId: string,
  ): Promise<OrderElementDocument> {
    const element = await this.orderElementModel.findOne({
      $and: [{ orderId: { $eq: orderId } }, { productId: { $eq: productId } }],
    });

    return element;
  }

  async getByOrderId(orderId: string): Promise<OrderElementDocument[]> {
    const elements = await this.orderElementModel.find({
      orderId,
    });
    return elements;
  }

  async createElement(
    orderElementDto: CreateOrderElementDto,
  ): Promise<OrderElementDocument> {
    const newElement = await this.orderElementModel.create({
      ...orderElementDto,
    });

    await newElement.save();

    return newElement;
  }

  async removeByProductId(productId: string): Promise<void> {
    await this.orderElementModel.deleteOne({
      productId,
    });
  }

  async addToExistingElement(
    orderElementId: string,
    orderElementDto: UpdateOrderElementDto,
  ) {
    const currentProduct = await this.productService.getProductById(
      orderElementDto.productId,
    );
    const currentorderElement = await this.orderElementModel.findById(
      orderElementId,
    );
    try {
      if (
        currentorderElement.amount + orderElementDto.amount >
        currentProduct.amount
      ) {
        throw new Error();
      }

      const updatedProduct = await this.orderElementModel.findByIdAndUpdate(
        orderElementId,
        {
          ...orderElementDto,
          amount: currentorderElement.amount + orderElementDto.amount,
          sum: currentorderElement.sum + orderElementDto.sum,
        },
        { returnDocument: 'after' },
      );

      return updatedProduct;
    } catch (error) {
      throw new BadRequestException(
        `Доступно данного товара: ${currentProduct.amount} ед., уже добавлено: ${currentorderElement.amount} ед.`,
        { description: orderElementDto.productId },
      );
    }
  }

  async updateElement(
    orderElementId: string,
    orderElementDto: UpdateOrderElementDto,
  ) {
    const updatedProduct = await this.orderElementModel.findByIdAndUpdate(
      orderElementId,
      {
        ...orderElementDto,
        amount: orderElementDto.amount,
        sum: orderElementDto.sum,
      },
      { returnDocument: 'after' },
    );

    return updatedProduct;
  }
}
