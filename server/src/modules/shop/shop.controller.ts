import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateOrderDto, ProductQueryDto } from './dto/shop.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('products')
  async getProducts(@Query() query: ProductQueryDto) {
    return this.shopService.getProducts(query);
  }

  @Get('product/:id')
  async getProduct(@Param('id') id: string) {
    return this.shopService.getProductById(id);
  }

  @Post('order')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Request() req, @Body() dto: CreateOrderDto) {
    return this.shopService.createOrder(req.user.userId, dto);
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async getOrders(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.shopService.getOrders(
      req.user.userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Get('order/:id')
  @UseGuards(JwtAuthGuard)
  async getOrder(@Param('id') id: string, @Request() req) {
    return this.shopService.getOrderById(id, req.user.userId);
  }

  @Post('payment/callback')
  async paymentCallback(
    @Body('orderId') orderId: string,
    @Body('success') success: boolean,
  ) {
    return this.shopService.handlePaymentCallback(orderId, success);
  }
}
