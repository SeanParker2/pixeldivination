import { Controller, Post, Get, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import {
  ChatCompletionDto,
  TarotReadingDto,
  NatalReadingDto,
  SynastryReadingDto,
  SwitchProviderDto,
} from './dto/ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() dto: ChatCompletionDto) {
    const result = await this.aiService.chat(dto);
    return { data: result };
  }

  @Post('tarot')
  async tarotReading(@Body() dto: TarotReadingDto) {
    const result = await this.aiService.tarotReading(dto);
    return { data: result };
  }

  @Post('natal')
  async natalReading(@Body() dto: NatalReadingDto) {
    const result = await this.aiService.natalReading(dto);
    return { data: result };
  }

  @Post('synastry')
  async synastryReading(@Body() dto: SynastryReadingDto) {
    const result = await this.aiService.synastryReading(dto);
    return { data: result };
  }

  @Get('providers')
  getProviders() {
    return { data: this.aiService.getProviders() };
  }

  @Post('switch-provider')
  switchProvider(@Body() dto: SwitchProviderDto) {
    return this.aiService.setProvider(dto.provider);
  }
}
