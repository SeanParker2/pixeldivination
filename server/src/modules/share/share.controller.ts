import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ShareService } from './share.service';
import { GenerateShareCardDto } from './dto/share.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('share')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async generateShareCard(@Request() req, @Body() dto: GenerateShareCardDto) {
    return this.shareService.generateShareCard(req.user.userId, dto);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getShareStats(@Request() req) {
    return this.shareService.getShareStats(req.user.userId);
  }
}
