import { Module, Global } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottleGuard } from './guards/throttle.guard';
import { AiThrottleGuard } from './guards/ai-throttle.guard';
import { PremiumGuard } from './guards/premium.guard';
import { UsageInterceptor } from './interceptors/usage.interceptor';
import { PrismaModule } from '../../prisma/prisma.module';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule,
  ],
  providers: [ThrottleGuard, AiThrottleGuard, PremiumGuard, UsageInterceptor],
  exports: [ThrottleGuard, AiThrottleGuard, PremiumGuard, UsageInterceptor],
})
export class CommonModule {}
