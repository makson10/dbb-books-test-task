import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsISBN, IsNumber, IsString } from 'class-validator';

export class BookDto {
  @ApiProperty({ required: false })
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsISBN()
  isbn: string;

  @ApiProperty({ required: false })
  @IsDate()
  publishDate: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  copiesTotal: number;

  @ApiProperty({ required: false })
  @IsNumber()
  copiesAvailable: number;

  @ApiProperty({ required: false })
  @IsNumber()
  publisherId: number;
}
