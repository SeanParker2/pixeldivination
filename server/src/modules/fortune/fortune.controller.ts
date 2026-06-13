import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { FortuneService } from './fortune.service';
import { GetFortuneDto } from './dto/fortune.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('fortune')
export class FortuneController {
  constructor(private fortuneService: FortuneService) {}

  @Get('daily')
  @UseGuards(JwtAuthGuard)
  async getDailyFortune(@Request() req, @Query() dto: GetFortuneDto) {
    return this.fortuneService.getDailyFortune(req.user.userId, dto);
  }

  @Get('calendar')
  @UseGuards(JwtAuthGuard)
  async getCalendar(
    @Request() req,
    @Query('zodiac') zodiac: string,
    @Query('month') month: string,
  ) {
    return this.fortuneService.getFortuneCalendar(req.user.userId, zodiac, month);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getHistory(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.fortuneService.getFortuneHistory(
      req.user.userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 30,
    );
  }
}
