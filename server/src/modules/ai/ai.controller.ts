import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import {
  ChatCompletionDto,
  TarotReadingDto,
  NatalReadingDto,
  SynastryReadingDto,
  SwitchProviderDto,
} from './dto/ai.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AiThrottleGuard } from '../common/guards/ai-throttle.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @UseGuards(JwtAuthGuard, AiThrottleGuard)
  async chat(@Body() dto: ChatCompletionDto) {
    const result = await this.aiService.chat(dto);
    return { data: result };
  }

  @Post('tarot')
  @UseGuards(JwtAuthGuard, AiThrottleGuard)
  async tarotReading(@Body() dto: TarotReadingDto) {
    const result = await this.aiService.tarotReading(dto);
    return { data: result };
  }

  @Post('natal')
  @UseGuards(JwtAuthGuard, AiThrottleGuard)
  async natalReading(@Body() dto: NatalReadingDto) {
    const result = await this.aiService.natalReading(dto);
    return { data: result };
  }

  @Post('synastry')
  @UseGuards(JwtAuthGuard, AiThrottleGuard)
  async synastryReading(@Body() dto: SynastryReadingDto) {
    const result = await this.aiService.synastryReading(dto);
    return { data: result };
  }

  @Get('providers')
  getProviders() {
    return { data: this.aiService.getProviders() };
  }

  @Post('switch-provider')
  @UseGuards(JwtAuthGuard)
  switchProvider(@Body() dto: SwitchProviderDto) {
    return this.aiService.setProvider(dto.provider);
  }
}
