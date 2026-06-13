import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateNatalDto {
  @IsDateString()
  birthDate: string;

  @IsString()
  birthTime: string;

  @IsString()
  birthCity: string;

  @IsNumber()
  birthLat: number;

  @IsNumber()
  birthLng: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  houseSystem?: string;
}

export class CreateSynastryDto {
  @IsDateString()
  birthDateA: string;

  @IsString()
  birthTimeA: string;

  @IsString()
  birthCityA: string;

  @IsNumber()
  birthLatA: number;

  @IsNumber()
  birthLngA: number;

  @IsDateString()
  birthDateB: string;

  @IsString()
  birthTimeB: string;

  @IsString()
  birthCityB: string;

  @IsNumber()
  birthLatB: number;

  @IsNumber()
  birthLngB: number;

  @IsOptional()
  @IsString()
  partnerName?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
