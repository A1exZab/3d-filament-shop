import { FilesModule } from './../files/files.module';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { MaterialModule } from 'src/material/material.module';
import { ColorModule } from 'src/color/color.module';
import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    FilesModule,
    MaterialModule,
    ColorModule,
    ManufacturerModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
