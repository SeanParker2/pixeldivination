import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  productId: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  paymentMethod?: string;
}

export class ProductQueryDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
