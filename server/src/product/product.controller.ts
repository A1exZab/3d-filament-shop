import { ProductService } from './product.service';
import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Patch,
  UploadedFile,
  UseInterceptors,
  Query,
  Logger,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-produc.dto';
import { Public } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductAmountDto } from './dto/update-product-amount.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('findByFilter')
  getProductByFilter(
    @Query('materialId') materialId: string[],
    @Query('search') search: string,
  ) {
    return this.productService.getProductByFilter(materialId, search);
  }

  @Public()
  @Get(':productId')
  getProductById(@Param('productId') productId: string) {
    return this.productService.getProductById(productId);
  }

  @Public()
  @Get()
  getAllProducts() {
    const products = this.productService.getAllProducts();
    return products;
  }

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  createProduct(@Body() productDto: CreateProductDto, @UploadedFile() image) {
    return this.productService.createProduct(productDto, image);
  }

  @Delete(':productId')
  removeProduct(@Param('productId') productId: string) {
    this.productService.removeProduct(productId);
  }

  @Patch(':productId')
  @UseInterceptors(FileInterceptor('img'))
  updateProduct(
    @Body() productDto: UpdateProductDto,
    @Param('productId') productId: string,
    @UploadedFile() image,
  ) {
    return this.productService.updateProduct(productId, productDto, image);
  }

  @Patch('amount/:productId')
  updateProductAmount(
    @Body() productDto: UpdateProductAmountDto,
    @Param('productId') productId: string,
  ) {
    return this.productService.updateProductAmount(productId, productDto);
  }
}
