import { Author } from '../entities/author.entity';
import { BookDto } from './book.dto';
import { Publisher } from '../entities/publisher.entity';
import { Genre } from '../entities/genre.entity';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { PublisherDto } from './publisher.dto';
import { AuthorDto } from './author.dto';
import { GenreDto } from './genre.dto';

@ApiSchema({ name: 'BookWithRelations' })
export class BookWithRelationsDto extends BookDto {
  @ApiProperty({ type: PublisherDto })
  publisher: Publisher;

  @ApiProperty({ type: [AuthorDto] })
  authors: Author[];

  @ApiProperty({ type: [GenreDto] })
  genres: Genre[];
}
