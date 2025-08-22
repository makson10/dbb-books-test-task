import { OmitType, ApiSchema } from '@nestjs/swagger';
import { BookDto } from './book.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ApiSchema({ name: 'CreateBook' })
export class CreateBookDto extends OmitType(BookDto, [
  'id',
  'copiesAvailable',
  'publisherId',
]) {
  @ApiProperty()
  @IsString()
  authorName: string;

  @ApiProperty()
  @IsString()
  publisherName: string;

  @ApiProperty()
  @IsString()
  genre: string;
}
