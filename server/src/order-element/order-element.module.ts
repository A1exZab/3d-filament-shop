import { Module } from '@nestjs/common';
import { OrderElementController } from './order-element.controller';
import { OrderElementService } from './order-element.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderElement, OrderElementSchema } from './order-element.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderElement.name, schema: OrderElementSchema },
    ]),
    ProductModule,
  ],
  controllers: [OrderElementController],
  providers: [OrderElementService],
})
export class OrderElementModule {}
