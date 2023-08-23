import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Color } from 'src/color/color.schema';
import { Manufacturer } from 'src/manufacturer/manufacturer.schema';
import { Material } from 'src/material/material.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  printSpeed: string;

  @Prop({ required: true })
  bedTemp: string;

  @Prop({ required: true })
  hotendTemp: string;

  @Prop({ required: true })
  diameter: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  img: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  })
  material: Material;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Color' })
  color: Color;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  })
  manufacturer: Manufacturer;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
