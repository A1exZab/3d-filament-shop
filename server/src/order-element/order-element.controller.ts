import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderElementService } from './order-element.service';
import { CreateOrderElementDto } from './dto/create-order-element';
import { UpdateOrderElementDto } from './dto/update-order-element';

@Controller('orderElement')
export class OrderElementController {
  constructor(private readonly orderElementService: OrderElementService) {}

  @Get('find')
  getByIds(
    @Query('orderId') orderId: string,
    @Query('productId') productId: string,
  ) {
    return this.orderElementService.getByIds(orderId, productId);
  }

  @Get(':orderId')
  getByOrderId(@Param('orderId') orderId: string) {
    return this.orderElementService.getByOrderId(orderId);
  }

  @Post()
  createElement(@Body() orderElementDto: CreateOrderElementDto) {
    return this.orderElementService.createElement(orderElementDto);
  }

  @Delete(':productId')
  removeElement(@Param('productId') productId: string) {
    return this.orderElementService.removeByProductId(productId);
  }

  @Patch('update/:orderElementId')
  updateElement(
    @Body() orderElementDto: UpdateOrderElementDto,
    @Param('orderElementId') orderElementId: string,
  ) {
    return this.orderElementService.updateElement(
      orderElementId,
      orderElementDto,
    );
  }

  @Patch('addToExisting/:orderElementId')
  addToExistingElement(
    @Body() orderElementDto: UpdateOrderElementDto,
    @Param('orderElementId') orderElementId: string,
  ) {
    return this.orderElementService.addToExistingElement(
      orderElementId,
      orderElementDto,
    );
  }
}
