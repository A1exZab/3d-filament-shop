import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':userId')
  getNewOrder(@Param('userId') userId: string) {
    return this.orderService.getNewOrder(userId);
  }

  @Post()
  createOrder(@Body() orderDto: CreateOrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Patch(':orderId')
  updateOrder(
    @Param('orderId') orderId: string,
    @Body() orderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderId, orderDto);
  }

  @Get('completed/:userId')
  getCompletedOrders(@Param('userId') userId: string) {
    return this.orderService.getCompletedOrders(userId);
  }
}
