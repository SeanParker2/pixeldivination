import { IsString, IsOptional, IsDateString } from 'class-validator';

export class GetFortuneDto {
  @IsString()
  zodiac: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  persona?: string;
}
