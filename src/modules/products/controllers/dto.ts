import {
  MaxLength,
  IsNumber,
  IsString,
  IsNotEmpty,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  price: number;
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  @IsOptional()
  price: number;
}
