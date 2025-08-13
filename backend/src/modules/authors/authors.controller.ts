import { Author } from '@/common/entities/author.entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto } from './dto/author.dto';
import { faker } from '@faker-js/faker';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  //! remove it later
  @Get()
  getAllAuthors() {
    return this.authorsRepository.find();
  }

  //!   solve bug
  @Get('/:id/books')
  getAllAuthorBooks(@Param('id') id: number) {
    return this.authorsRepository.find({
      where: { id },
      relations: ['books'],
      select: { books: true },
    });
  }

  @Post()
  //   createAuthor(@Body() newAuthor: AuthorDto) {
  createAuthor() {
    const newAuthor: AuthorDto = {
      fullName: faker.person.fullName(),
      birthDate: faker.date.past({ years: 80 }),
    };
    const author = this.authorsRepository.create(newAuthor);
    return this.authorsRepository.save(author);
  }
}
