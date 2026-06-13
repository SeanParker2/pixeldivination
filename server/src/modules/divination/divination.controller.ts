import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DivinationService } from './divination.service';
import {
  TarotDrawDto,
  LenormandDrawDto,
  BaziDto,
  NumerologyDto,
} from './dto/divination.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AiThrottleGuard } from '../common/guards/ai-throttle.guard';

@Controller('divination')
@UseGuards(JwtAuthGuard)
export class DivinationController {
  constructor(private divinationService: DivinationService) {}

  @Post('tarot')
  async drawTarot(@Request() req, @Body() dto: TarotDrawDto) {
    return this.divinationService.drawTarot(req.user.userId, dto);
  }

  @Post('lenormand')
  async drawLenormand(@Request() req, @Body() dto: LenormandDrawDto) {
    return this.divinationService.drawLenormand(req.user.userId, dto);
  }

  @Post('bazi')
  async calculateBazi(@Request() req, @Body() dto: BaziDto) {
    return this.divinationService.calculateBazi(req.user.userId, dto);
  }

  @Post('numerology')
  async calculateNumerology(@Request() req, @Body() dto: NumerologyDto) {
    return this.divinationService.calculateNumerology(req.user.userId, dto);
  }

  @Post(':id/ai-reading')
  @UseGuards(AiThrottleGuard)
  async getAiReading(
    @Param('id') id: string,
    @Request() req,
    @Body('persona') persona?: string,
  ) {
    return this.divinationService.getAiReading(id, req.user.userId, persona);
  }

  @Get('history')
  async getHistory(
    @Request() req,
    @Query('type') divType?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.divinationService.getHistory(
      req.user.userId,
      divType,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Request() req) {
    return this.divinationService.getById(id, req.user.userId);
  }
}
