import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto, ProductQueryDto } from './dto/shop.dto';

// Mock products database
const PRODUCTS = [
  {
    id: 'pro_monthly',
    name: 'Pro 月卡',
    description: '解锁全部功能，无限AI解读',
    price: 19.9,
    category: 'subscription',
    type: 'virtual',
    buff: '无限解读',
  },
  {
    id: 'pro_yearly',
    name: 'Pro 年卡',
    description: '最划算的年度订阅',
    price: 168,
    category: 'subscription',
    type: 'virtual',
    buff: '年度最优',
  },
  {
    id: 'single_reading',
    name: '单次深度解读',
    description: '一次深度AI占卜解读',
    price: 3.9,
    category: 'reading',
    type: 'virtual',
    buff: '单次使用',
  },
  {
    id: 'crystal_rose_quartz',
    name: '粉水晶手链',
    description: '天然粉水晶，增强爱情运势',
    price: 128,
    category: 'crystal',
    type: 'physical',
    buff: '爱情招福',
  },
  {
    id: 'crystal_amethyst',
    name: '紫水晶吊坠',
    description: '天然紫水晶，增强直觉力',
    price: 168,
    category: 'crystal',
    type: 'physical',
    buff: '直觉增强',
  },
  {
    id: 'tarot_rider_waite',
    name: '韦特塔罗牌（经典版）',
    description: '原版韦特塔罗牌',
    price: 298,
    category: 'tarot_deck',
    type: 'physical',
    buff: '经典收藏',
  },
];

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async getProducts(query: ProductQueryDto) {
    let products = [...PRODUCTS];

    if (query.category) {
      products = products.filter(p => p.category === query.category);
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      items: products.slice(start, end),
      total: products.length,
      page,
      limit,
    };
  }

  async getProductById(id: string) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) throw new NotFoundException('商品不存在');
    return product;
  }

  async createOrder(userId: string, dto: CreateOrderDto) {
    const product = PRODUCTS.find(p => p.id === dto.productId);
    if (!product) throw new NotFoundException('商品不存在');

    const order = await this.prisma.order.create({
      data: {
        userId,
        orderType: product.category,
        productId: product.id,
        productName: product.name,
        amount: dto.amount || product.price,
        status: 'pending',
        paymentMethod: dto.paymentMethod || 'wechat',
      },
    });

    return {
      orderId: order.id,
      product,
      amount: order.amount,
      paymentMethod: order.paymentMethod,
      status: order.status,
    };
  }

  async getOrders(userId: string, page = 1, limit = 20) {
    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.order.count({ where: { userId } }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getOrderById(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
    });
    if (!order) throw new NotFoundException('订单不存在');
    return order;
  }

  // Mock payment callback
  async handlePaymentCallback(orderId: string, success: boolean) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'pending') throw new BadRequestException('订单状态异常');

    if (success) {
      // Update order status
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'paid',
          paidAt: new Date().toISOString(),
        },
      });

      // If subscription, activate user premium
      if (order.orderType === 'subscription') {
        const endDate = new Date();
        if (order.productId === 'pro_monthly') {
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (order.productId === 'pro_yearly') {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        await this.prisma.user.update({
          where: { id: order.userId },
          data: {
            isPremium: true,
            premiumUntil: endDate.toISOString(),
          },
        });

        await this.prisma.subscription.create({
          data: {
            userId: order.userId,
            planType: order.productId,
            status: 'active',
            startDate: new Date(),
            endDate: endDate.toISOString(),
            paymentId: orderId,
            paymentAmount: order.amount,
            paymentMethod: order.paymentMethod,
          },
        });
      }

      return { success: true, message: '支付成功' };
    } else {
      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'failed' },
      });
      return { success: false, message: '支付失败' };
    }
  }
}
