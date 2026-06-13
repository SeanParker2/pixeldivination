import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  postType?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  divinationId?: string;
}

export class CreateCommentDto {
  @IsString()
  content: string;
}

export class PostQueryDto {
  @IsString()
  @IsOptional()
  zodiac?: string;

  @IsString()
  @IsOptional()
  postType?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
