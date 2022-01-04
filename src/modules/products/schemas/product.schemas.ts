import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({ required: true, maxLength: 100 })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  @ApiProperty()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
