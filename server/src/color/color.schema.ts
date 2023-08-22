import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColorDocument = HydratedDocument<Color>;

@Schema({ versionKey: false })
export class Color {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  code: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
