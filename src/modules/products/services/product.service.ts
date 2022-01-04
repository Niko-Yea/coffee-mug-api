import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(product: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async update(id: string, updatedProduct: UpdateProductDto): Promise<Product> {
    const product = await this.getById(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    return this.productModel.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });
  }

  async delete(id: string): Promise<Product> {
    const product = await this.getById(id);
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`);
    }
    return this.productModel.findByIdAndDelete(id);
  }
}
