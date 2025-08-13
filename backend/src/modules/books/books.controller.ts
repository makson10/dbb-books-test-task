import { Book } from '@/common/entities/book.entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllBooksDto } from './dto/getAllBooks.dto';
import { BookDto } from './dto/book.dto';
import { faker } from '@faker-js/faker';
import { Author } from '@/common/entities/author.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  @Get()
  getAllBooks(@Param() parameters: GetAllBooksDto) {
    return this.booksRepository.find({
      take: parameters.limit,
      skip: (parameters.page - 1) * parameters.limit,
      order: { [parameters.sortBy]: parameters.order },
    });
  }

  @Post()
  //   createBook(@Body() newBook: BookDto) {
  async createBook() {
    const newBook: BookDto = {
      title: faker.book.title(),
      copiesAvailable: faker.number.int({ min: 1, max: 100 }),
      copiesTotal: faker.number.int({ min: 1, max: 100 }),
      isbn: faker.commerce.isbn(),
      publishDate: faker.date.past(),
      publisherId: faker.number.int({ min: 1, max: 3 }),
    };

    const author = await this.authorRepository.findOne({ where: { id: 1 } });

    const book = this.booksRepository.create({
      ...newBook,
      authors: [author as Author],
    });
    return await this.booksRepository.save(book);
  }

  @Get(':id/history')
  getBookHistory() {}
}
