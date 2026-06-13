import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../../prisma/prisma.service';

export const RATE_LIMIT_KEY = 'rate_limit';
export const RateLimit = (limit: number, window: string) =>
  Reflect.metadata(RATE_LIMIT_KEY, { limit, window });

interface RateLimitConfig {
  limit: number;
  window: string;
}

const WINDOW_MS: Record<string, number> = {
  '1m': 60 * 1000,
  '1h': 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
};

@Injectable()
export class ThrottleGuard implements CanActivate {
  private limits: Map<string, { count: number; resetAt: number }> = new Map();

  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = this.reflector.get<RateLimitConfig>(
      RATE_LIMIT_KEY,
      context.getHandler(),
    );

    if (!config) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const ip = request.ip || request.connection?.remoteAddress || 'unknown';
    const key = userId || ip;

    const now = Date.now();
    const windowMs = WINDOW_MS[config.window] || WINDOW_MS['1d'];
    const record = this.limits.get(key);

    if (record && record.resetAt > now) {
      if (record.count >= config.limit) {
        throw new HttpException(
          {
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            message: `请求过于频繁，请 ${config.window} 后再试`,
            retryAfter: Math.ceil((record.resetAt - now) / 1000),
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      record.count++;
    } else {
      this.limits.set(key, { count: 1, resetAt: now + windowMs });
    }

    return true;
  }
}
