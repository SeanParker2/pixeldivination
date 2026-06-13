import { IsString, IsOptional, IsDateString } from 'class-validator';

export class ZodiacMatchDto {
  @IsString()
  zodiacA: string;

  @IsString()
  zodiacB: string;
}

export class SynastryMatchDto {
  @IsDateString()
  birthDateA: string;

  @IsString()
  birthTimeA: string;

  @IsString()
  birthCityA: string;

  @IsDateString()
  birthDateB: string;

  @IsString()
  birthTimeB: string;

  @IsString()
  birthCityB: string;

  @IsString()
  @IsOptional()
  partnerName?: string;
}
