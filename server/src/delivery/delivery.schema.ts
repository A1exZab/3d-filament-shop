import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeliveryDocument = HydratedDocument<Delivery>;

@Schema({ versionKey: false })
export class Delivery {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop()
  price: number;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
