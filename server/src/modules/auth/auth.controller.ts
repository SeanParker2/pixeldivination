import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendSmsDto, SmsLoginDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('sms/send')
  async sendSms(@Body() dto: SendSmsDto) {
    return this.authService.sendSmsCode(dto.phone);
  }

  @Post('sms/login')
  async smsLogin(@Body() dto: SmsLoginDto) {
    return this.authService.smsLogin(dto.phone, dto.code);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.userId);
  }
}
