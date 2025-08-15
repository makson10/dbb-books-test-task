import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsDate, IsISBN, IsNumber, IsString } from 'class-validator';

@ApiSchema()
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
  @IsDate()
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
