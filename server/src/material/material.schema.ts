import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MaterialDocument = HydratedDocument<Material>;

@Schema({ versionKey: false })
export class Material {
  @Prop({ required: true, unique: true })
  name: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
