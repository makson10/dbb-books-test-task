import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllBooksDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  limit: number = 10;

  @ApiProperty({ required: false, default: 'title' })
  @IsOptional()
  @IsString()
  sortBy: 'title' | 'publishDate' = 'title';

  @ApiProperty({ required: false, default: 'asc' })
  @IsOptional()
  @IsString()
  order: 'asc' | 'desc' = 'asc';
}
