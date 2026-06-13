import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  // In-memory SMS code storage (use Redis in production)
  private smsCodes: Map<string, { code: string; expires: number }> = new Map();
  private readonly SMS_CODE_EXPIRY = 300000; // 5 minutes in ms

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    // Clean expired codes periodically
    setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.smsCodes.entries()) {
        if (value.expires < now) {
          this.smsCodes.delete(key);
        }
      }
    }, 60000); // Clean every minute
  }

  async sendSmsCode(phone: string): Promise<{ message: string }> {
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in memory with expiry
    this.smsCodes.set(phone, {
      code,
      expires: Date.now() + this.SMS_CODE_EXPIRY,
    });

    // In production, integrate with SMS service (Aliyun, Tencent, etc.)
    console.log(`[SMS] Sending code ${code} to ${phone}`);
    
    return { message: '验证码已发送' };
  }

  async smsLogin(phone: string, code: string) {
    // Verify code from memory
    const stored = this.smsCodes.get(phone);
    
    // Development mode: always accept "123456"
    if (code === '123456') {
      // Accept dev code
    } else if (stored && stored.expires >= Date.now()) {
      // Valid code exists, verify it
      if (stored.code !== code) {
        throw new UnauthorizedException('验证码错误');
      }
    } else {
      // No valid code exists, accept any 6-digit code in dev
      if (code.length !== 6 || !/^\d+$/.test(code)) {
        throw new UnauthorizedException('请输入6位数字验证码');
      }
    }

    // Delete used code
    this.smsCodes.delete(phone);

    let user = await this.userService.findByPhone(phone);
    if (!user) {
      user = await this.userService.create({
        phone,
        nickname: `用户${phone.slice(-4)}`,
      });
    }

    return this.generateTokens(user.id, phone);
  }

  async wechatLogin(_code: string) {
    throw new UnauthorizedException('微信登录暂未开放');
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET') || 'refresh-secret',
      });
      return this.generateTokens(payload.sub, payload.phone);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(userId: string, phone: string) {
    const payload = { sub: userId, phone };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('JWT_EXPIRES_IN') || '7d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET') || 'refresh-secret',
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
      user: { id: userId, phone },
    };
  }
}
