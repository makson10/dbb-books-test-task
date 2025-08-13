import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllBooksDto {
  @ApiProperty({ default: 1 })
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @ApiProperty({ default: 10 })
  @IsOptional()
  @IsNumber()
  limit: number = 10;

  @ApiProperty({ default: 'title' })
  @IsOptional()
  @IsString()
  sortBy: 'title' | 'publishDate' = 'title';

  @ApiProperty({ default: 'asc' })
  @IsOptional()
  @IsString()
  order: 'asc' | 'desc' = 'asc';
}
