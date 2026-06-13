import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

// Daily limits for AI endpoints
const DAILY_LIMITS = {
  free: 3,      // 3 AI readings per day for free users
  premium: -1,  // unlimited for premium users
};

@Injectable()
export class AiThrottleGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    // If no user (unauthenticated), apply a basic IP-based limit
    if (!userId) {
      return true; // Let JwtAuthGuard handle auth
    }

    // Check if user is premium
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isPremium: true, premiumUntil: true },
    });

    const isPremium = user?.isPremium &&
      (!user.premiumUntil || new Date(user.premiumUntil) > new Date());

    if (isPremium) {
      return true; // Premium users have no limit
    }

    // Count today's AI usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCount = await this.prisma.divination.count({
      where: {
        userId,
        createdAt: { gte: today },
      },
    });

    const limit = DAILY_LIMITS.free;

    if (todayCount >= limit) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `今日免费次数已用完（${limit}次/天），升级 Pro 会员享受无限次数`,
          retryAfter: this.getSecondsUntilMidnight(),
          limit,
          remaining: 0,
          used: todayCount,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Add rate limit headers to response
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-RateLimit-Limit', limit);
    response.setHeader('X-RateLimit-Remaining', Math.max(0, limit - todayCount - 1));
    response.setHeader('X-RateLimit-Used', todayCount);

    return true;
  }

  private getSecondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.ceil((midnight.getTime() - now.getTime()) / 1000);
  }
}
