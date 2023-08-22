import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/order.schema';
import { Product } from 'src/product/product.schema';
import { User } from 'src/user/user.schema';

export type OrderElementDocument = HydratedDocument<OrderElement>;

@Schema({ versionKey: false })
export class OrderElement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orderId: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: Product;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  sum: number;
}

export const OrderElementSchema = SchemaFactory.createForClass(OrderElement);
