import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schemas';
import { CreateProductDto, UpdateProductDto } from '../controllers/dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async getById(id: string): Promise<Product> {
    const validObjectId = Types.ObjectId.isValid(id);
    if (!validObjectId) {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    const product = await this.productModel.findById({ _id: id });
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    return product;
  }

  async create({ name, price }: CreateProductDto): Promise<Product> {
    if (!name || !price) {
      throw new BadRequestException();
    }

    if (name.length > 100) {
      throw new BadRequestException(
        'the name should not be less than 100 characters',
      );
    }

    const isNumber = typeof price;

    if (isNumber !== 'number') {
      throw new BadRequestException('price must be a number');
    }

    const createdProduct = new this.productModel({ name, price });
    return createdProduct.save();
  }

  async update(
    id: string,
    { name, price }: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.getById(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    if (!name || !price) {
      throw new BadRequestException();
    }

    if (product.name.length > 100) {
      throw new BadRequestException(
        'the name should not be less than 100 characters',
      );
    }

    const isNumber = typeof price;

    if (isNumber !== 'number') {
      throw new BadRequestException('price must be a number');
    }

    return this.productModel.findByIdAndUpdate(
      id,
      { name, price },
      {
        new: true,
      },
    );
  }

  async delete(id: string): Promise<Product> {
    const product = await this.getById(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }
    return this.productModel.findByIdAndDelete(id);
  }
}
