import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-produc.dto';
import { DeleteResult } from 'mongodb';
import { FilesService } from 'src/files/files.service';
import { MaterialService } from 'src/material/material.service';
import { ColorService } from 'src/color/color.service';
import { ManufacturerService } from 'src/manufacturer/manufacturer.service';
import { UpdateProductAmountDto } from './dto/update-product-amount.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private filesService: FilesService,
    private materialService: MaterialService,
    private colorService: ColorService,
    private manufacturerService: ManufacturerService,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProductByFilter(materialId, search): Promise<Product[]> {
    let filtered: Product[] | [];

    if (materialId === undefined) {
      filtered = await this.productModel.find({
        fullName: { $regex: search, $options: 'i' },
      });

      return filtered;
    }

    if (!search.length) {
      filtered = await this.productModel.find({
        material: { $in: materialId },
      });

      return filtered;
    }

    filtered = await this.productModel.find({
      $and: [
        { material: { $in: materialId } },
        { fullName: { $regex: search, $options: 'i' } },
      ],
    });

    return filtered;
  }

  async getProductById(productId: string): Promise<ProductDocument> {
    try {
      const product = (await this.productModel.findById(productId)).populate([
        'color',
        'material',
        'manufacturer',
      ]);

      if (!product) {
        throw new Error();
      }

      return product;
    } catch (error) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }
  }

  async createProduct(
    productDto: CreateProductDto,
    image: any,
  ): Promise<ProductDocument> {
    try {
      const fileName = await this.filesService.createFile(image);
      const { name: materialName } = await this.materialService.getMaterialById(
        productDto.material,
      );
      const { name: colorName } = await this.colorService.getColorById(
        productDto.color,
      );
      const { name: manufacturerName } =
        await this.manufacturerService.getManufacturerById(
          productDto.manufacturer,
        );

      const newProduct = await this.productModel.create({
        ...productDto,
        fullName: `${colorName} ${materialName} пластик «${productDto.name}», ${manufacturerName}`,
        img: fileName,
      });
      await newProduct.save();

      return newProduct;
    } catch (error) {
      throw new HttpException(
        'При создании товара произошла ошибка',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async removeProduct(productId: string): Promise<void> {
    try {
      const productToRemove: DeleteResult =
        await this.productModel.findByIdAndDelete(productId);

      if (!productToRemove) {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException(
        'При удалении товара произошла ошибка',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProduct(
    productId: string,
    productDto: UpdateProductDto,
    image: any,
  ): Promise<ProductDocument> {
    try {
      const { name: materialName } = await this.materialService.getMaterialById(
        productDto.material,
      );
      const { name: colorName } = await this.colorService.getColorById(
        productDto.color,
      );
      const { name: manufacturerName } =
        await this.manufacturerService.getManufacturerById(
          productDto.manufacturer,
        );

      if (image === undefined) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(
          productId,
          {
            ...productDto,
            fullName: `${colorName} ${materialName} пластик «${productDto.name}», ${manufacturerName}`,
          },
          { returnDocument: 'after' },
        );

        return updatedProduct;
      }
      const fileName = await this.filesService.createFile(image);
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        {
          ...productDto,
          fullName: `${colorName} ${materialName} пластик «${productDto.name}», ${manufacturerName}`,
          img: fileName,
        },
        { returnDocument: 'after' },
      );

      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        'При обновлении товара произошла ошибка',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProductAmount(
    productId: string,
    productDto: UpdateProductAmountDto,
  ): Promise<ProductDocument> {
    try {
      const currentProduct = await this.productModel.findById(productId);

      if (productDto.amount > currentProduct.amount) {
        throw new Error();
      }

      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        {
          amount: currentProduct.amount - productDto.amount,
        },
        { returnDocument: 'after' },
      );

      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        'При обновлении товара произошла ошибка',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
