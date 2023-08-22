import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Public } from 'src/common/decorators';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Public()
  @Get()
  getAll() {
    return this.deliveryService.getAll();
  }

  @Post()
  addDeliveryMethod(@Body() deliveryDto: CreateDeliveryDto) {
    return this.deliveryService.addDeliveryMethod(deliveryDto);
  }
}
