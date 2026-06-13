import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { MatchService } from './match.service';
import { ZodiacMatchDto, SynastryMatchDto } from './dto/match.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('zodiac-list')
  getZodiacList() {
    return this.matchService.getZodiacList();
  }

  @Post('zodiac')
  async zodiacMatch(@Body() dto: ZodiacMatchDto) {
    return this.matchService.zodiacMatch(dto);
  }

  @Post('synastry')
  @UseGuards(JwtAuthGuard)
  async synastryMatch(@Request() req, @Body() dto: SynastryMatchDto) {
    return this.matchService.synastryMatch(req.user.userId, dto);
  }
}
