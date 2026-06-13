import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './modules/common/common.module';
import { AiModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChartModule } from './modules/chart/chart.module';
import { DivinationModule } from './modules/divination/divination.module';
import { FortuneModule } from './modules/fortune/fortune.module';
import { ShopModule } from './modules/shop/shop.module';
import { CommunityModule } from './modules/community/community.module';
import { MatchModule } from './modules/match/match.module';
import { ShareModule } from './modules/share/share.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    PrismaModule,
    AiModule,
    AuthModule,
    UserModule,
    ChartModule,
    DivinationModule,
    FortuneModule,
    ShopModule,
    CommunityModule,
    MatchModule,
    ShareModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
