import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { AuthorDto, BookDto, GenreDto, PublisherDto } from '@lib/assets/dto';
import { Author, Genre, Publisher } from '@lib/assets/entities';

@ApiSchema({ name: 'BookWithRelations' })
export class BookWithRelationsDto extends BookDto {
  @ApiProperty({ type: PublisherDto })
  publisher: Publisher;

  @ApiProperty({ type: [AuthorDto] })
  authors: Author[];

  @ApiProperty({ type: [GenreDto] })
  genres: Genre[];
}
