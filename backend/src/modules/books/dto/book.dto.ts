import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsDateString, IsISBN, IsNumber, IsString } from 'class-validator';

@ApiSchema({ name: 'Book' })
export class BookDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsISBN()
  isbn: string;

  @ApiProperty()
  @IsDateString()
  publishDate: Date;

  @ApiProperty()
  @IsNumber()
  copiesTotal: number;

  @ApiProperty()
  @IsNumber()
  copiesAvailable: number;

  @ApiProperty()
  @IsNumber()
  publisherId: number;
}
