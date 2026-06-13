import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../../prisma/prisma.service';

export const PREMIUM_KEY = 'premium';
export const RequirePremium = () => Reflect.metadata(PREMIUM_KEY, true);

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiresPremium = this.reflector.get<boolean>(
      PREMIUM_KEY,
      context.getHandler(),
    );

    if (!requiresPremium) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (!userId) {
      throw new HttpException(
        { statusCode: HttpStatus.UNAUTHORIZED, message: '请先登录' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isPremium: true, premiumUntil: true },
    });

    if (!user) {
      throw new HttpException(
        { statusCode: HttpStatus.NOT_FOUND, message: '用户不存在' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.isPremium || (user.premiumUntil && new Date(user.premiumUntil) < new Date())) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PAYMENT_REQUIRED,
          message: '此功能需要 Pro 会员',
          upgradeUrl: '/shop?product=pro_monthly',
        },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    return true;
  }
}
