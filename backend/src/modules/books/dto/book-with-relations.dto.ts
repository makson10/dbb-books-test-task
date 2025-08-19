import { Author } from '@/common/entities/author.entity';
import { BookDto } from './book.dto';
import { Publisher } from '@/common/entities/publisher.entity';
import { Genre } from '@/common/entities/genre.entity';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { PublisherDto } from '@modules/publishers/dto/publisher.dto';
import { AuthorDto } from '@modules/authors/dto/author.dto';
import { GenreDto } from '@modules/genres/dto/genre.dto';

@ApiSchema({ name: 'BookWithRelations' })
export class BookWithRelationsDto extends BookDto {
  @ApiProperty({ type: PublisherDto })
  publisher: Publisher;

  @ApiProperty({ type: [AuthorDto] })
  authors: Author[];

  @ApiProperty({ type: [GenreDto] })
  genres: Genre[];
}
