import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsageInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const path = request.path;
    const method = request.method;

    return next.handle().pipe(
      tap(async () => {
        if (!userId) return;

        // Log API usage
        try {
          await this.prisma.$executeRaw`
            INSERT INTO api_usage (user_id, path, method, created_at)
            VALUES (${userId}, ${path}, ${method}, NOW())
          `;
        } catch (error) {
          // Ignore errors in usage tracking
        }
      }),
    );
  }
}
