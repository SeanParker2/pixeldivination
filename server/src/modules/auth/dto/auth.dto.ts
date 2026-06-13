import { IsString, IsOptional, IsDateString } from 'class-validator';

export class SendSmsDto {
  @IsString()
  phone: string;
}

export class SmsLoginDto {
  @IsString()
  phone: string;

  @IsString()
  code: string;
}

export class WechatLoginDto {
  @IsString()
  code: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  birthTime?: string;

  @IsOptional()
  @IsString()
  birthCity?: string;

  @IsOptional()
  birthLat?: number;

  @IsOptional()
  birthLng?: number;
}
