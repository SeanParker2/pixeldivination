import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChartService } from './chart.service';
import { CreateNatalDto, CreateSynastryDto } from './dto/chart.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('chart')
@UseGuards(JwtAuthGuard)
export class ChartController {
  constructor(private chartService: ChartService) {}

  @Post('natal')
  async createNatal(@Request() req, @Body() dto: CreateNatalDto) {
    return this.chartService.createNatal(req.user.userId, dto);
  }

  @Post('synastry')
  async createSynastry(@Request() req, @Body() dto: CreateSynastryDto) {
    return this.chartService.createSynastry(req.user.userId, dto);
  }

  @Get('list')
  async list(@Request() req) {
    return this.chartService.findByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.chartService.findById(id);
  }

  @Post(':id/reading')
  async generateReading(
    @Param('id') id: string,
    @Body('persona') persona?: string,
  ) {
    return this.chartService.generateReading(id, persona);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.chartService.delete(id, req.user.userId);
  }
}
