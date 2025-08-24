import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@ApiSchema({ name: 'GetAllBooks' })
export class GetAllBooksDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
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
