import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ManufacturerDocument = HydratedDocument<Manufacturer>;

@Schema({ versionKey: false })
export class Manufacturer {
  @Prop({ required: true, unique: true })
  name: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
