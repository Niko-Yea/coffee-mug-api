import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Product } from '../schemas/product.schemas';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiTags('Products')
@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all products',
  })
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get one product',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  getOneProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create one product',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBody({ type: CreateProductDto })
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update one product',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiBody({ type: UpdateProductDto })
  updateProduct(
    @Body() updatedProduct: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.update(id, updatedProduct);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Delete one product',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @HttpCode(204)
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.delete(id);
  }
}
