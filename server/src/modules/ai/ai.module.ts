import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiCacheService } from './ai-cache.service';

@Module({
  imports: [ConfigModule],
  controllers: [AiController],
  providers: [AiService, AiCacheService],
  exports: [AiService, AiCacheService],
})
export class AiModule {}
