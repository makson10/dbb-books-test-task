import { Book } from '@/common/entities/book.entity';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllBooksDto } from './dto/getAllBooks.dto';
import { BookDto } from './dto/book.dto';
import { faker } from '@faker-js/faker';
import { Author } from '@/common/entities/author.entity';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { BookWithRelationsDto } from './dto/bookWithRelations.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(BorrowRecord)
    private borrowRecordRepository: Repository<BorrowRecord>,
  ) {}

  @ApiOperation({
    summary: 'Get all books with pagination and sorting',
    tags: ['books'],
    operationId: 'getAllBooks',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of books',
    type: [BookWithRelationsDto],
  })
  @Get()
  getAllBooks(
    @Query() parameters: GetAllBooksDto,
  ): Promise<BookWithRelationsDto[]> {
    return this.booksRepository.find({
      take: parameters.limit,
      skip: (parameters.page - 1) * parameters.limit,
      order: { [parameters.sortBy]: parameters.order },
      relations: ['authors', 'publisher', 'genres'],
    });
  }

  @Get('count')
  @ApiOperation({
    summary: 'Get total count of books',
    tags: ['books'],
    operationId: 'getBookCount',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns total count of books',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number' },
      },
    },
  })
  async getBookCount(): Promise<{ count: number }> {
    const count = await this.booksRepository.count();
    return { count };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new book with random data',
    tags: ['books'],
    operationId: 'createBook',
  })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  // change to Dto
  async createBook() {
    const newBook: Omit<BookDto, 'id'> = {
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
  @ApiOperation({
    summary: 'Get borrowing history for a specific book',
    tags: ['books'],
    operationId: 'getBookHistory',
  })
  @ApiParam({ name: 'id', description: 'Book ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns borrowing history for the book',
  })
  getBookHistory(@Param('id') bookId: string) {
    return this.borrowRecordRepository.find({
      where: { bookId: parseInt(bookId) },
      relations: ['borrower'],
      order: { borrowedAt: 'DESC' },
    });
  }
}
