import { Module } from '@nestjs/common';
import { DivinationController } from './divination.controller';
import { DivinationService } from './divination.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [DivinationController],
  providers: [DivinationService],
})
export class DivinationModule {}
