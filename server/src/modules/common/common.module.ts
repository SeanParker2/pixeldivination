import { Module, Global } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottleGuard } from './guards/throttle.guard';
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
  providers: [ThrottleGuard, PremiumGuard, UsageInterceptor],
  exports: [ThrottleGuard, PremiumGuard, UsageInterceptor],
})
export class CommonModule {}
