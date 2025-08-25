import { Author } from '@api/common/entities/author.entity';
import { BookDto } from './book.dto';
import { Publisher } from '@api/common/entities/publisher.entity';
import { Genre } from '@api/common/entities/genre.entity';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { PublisherDto } from '@api/modules/publishers/dto/publisher.dto';
import { AuthorDto } from '@api/modules/authors/dto/author.dto';
import { GenreDto } from '@api/modules/genres/dto/genre.dto';

@ApiSchema({ name: 'BookWithRelations' })
export class BookWithRelationsDto extends BookDto {
  @ApiProperty({ type: PublisherDto })
  publisher: Publisher;

  @ApiProperty({ type: [AuthorDto] })
  authors: Author[];

  @ApiProperty({ type: [GenreDto] })
  genres: Genre[];
}
