import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Delivery } from 'src/delivery/delivery.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  status: 'NEW' | 'PROCESSED';

  @Prop()
  sum: number;

  @Prop()
  address: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Delivery',
  })
  delivery: Delivery;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
