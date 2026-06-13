import { IsString, IsOptional, IsEnum } from 'class-validator';

export class GenerateShareCardDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  divinationId?: string;

  @IsString()
  @IsOptional()
  chartId?: string;

  @IsString()
  @IsOptional()
  fortuneId?: string;

  @IsString()
  @IsOptional()
  style?: string;
}
