import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class TarotDrawDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsString()
  @IsOptional()
  spreadType?: string;

  @IsString()
  @IsOptional()
  deckType?: string;

  @IsString()
  @IsOptional()
  persona?: string;
}

export class LenormandDrawDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsString()
  @IsOptional()
  spreadType?: string;

  @IsString()
  @IsOptional()
  persona?: string;
}

export class BaziDto {
  @IsString()
  birthDate: string;

  @IsOptional()
  birthHour?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  persona?: string;
}

export class NumerologyDto {
  @IsString()
  birthDate: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  persona?: string;
}

export class DivinationHistoryDto {
  @IsString()
  @IsOptional()
  divType?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
