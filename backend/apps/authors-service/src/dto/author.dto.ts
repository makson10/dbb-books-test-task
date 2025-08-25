import { Book } from '../entities/book.entity';
import { BookDto } from './book.dto';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Validate, IsNumber, IsDateString } from 'class-validator';

@ApiSchema({ name: 'Author' })
export class AuthorDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsDateString()
  @Validate((value) => value < new Date(), {
    message: 'birthDate must be in the past',
  })
  birthDate: Date;

  @ApiProperty({ type: [BookDto] })
  @Type(() => BookDto)
  books: Book[];
}
