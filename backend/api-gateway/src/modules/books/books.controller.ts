import { Book } from '@/common/entities/book.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllBooksDto } from './dto/get-all-books.dto';
import { Author } from '@/common/entities/author.entity';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { BookWithRelationsDto } from './dto/book-with-relations.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Publisher } from '@/common/entities/publisher.entity';
import { Genre } from '@/common/entities/genre.entity';
import { UserRole } from '@/common/entities/user.entity';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UserGuard } from '@/common/guard/user.guard';
import { RolesGuard } from '@/common/guard/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CountBookDto } from './dto/count-book.dto';
import { BookDto } from './dto/book.dto';
import { BookBorrowHistoryDto } from './dto/book-borrow-history.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,

    @InjectRepository(Author) private authorRepository: Repository<Author>,

    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,

    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,

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

  @ApiOperation({
    summary: 'Create a new book with random data',
    tags: ['books'],
    operationId: 'createBook',
  })
  @ApiResponse({
    status: 201,
    description: 'Book created successfully',
    type: BookDto,
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserGuard, RolesGuard)
  @Post()
  async createBook(@Body() newBook: CreateBookDto): Promise<BookDto> {
    const author = await this.authorRepository.findOne({
      where: { fullName: newBook.authorName },
    });

    const publisher = await this.publisherRepository.findOne({
      where: { name: newBook.publisherName },
    });

    const genre = await this.genreRepository.findOne({
      where: { name: newBook.genre },
    });

    const book = this.booksRepository.create({
      ...newBook,
      copiesAvailable: newBook.copiesTotal,
      authors: [author as Author],
      publisher: publisher as Publisher,
      genres: [genre as Genre],
    });
    return await this.booksRepository.save(book);
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
    type: CountBookDto,
  })
  async getBookCount(): Promise<CountBookDto> {
    return { count: await this.booksRepository.count() };
  }

  @ApiOperation({
    summary: 'Get details about specific book',
    tags: ['books'],
    operationId: 'getBookDetails',
  })
  @ApiParam({ name: 'id', description: 'Book ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns borrowing history for the book',
    type: BookWithRelationsDto,
    schema: {
      nullable: true,
    },
  })
  @Get(':id')
  getBookDetails(
    @Param('id') bookId: string,
  ): Promise<BookWithRelationsDto | null> {
    return this.booksRepository.findOne({
      where: { id: parseInt(bookId) },
      relations: ['authors', 'publisher', 'genres'],
    });
  }

  @ApiOperation({
    summary: 'Get borrowing history for a specific book',
    tags: ['books'],
    operationId: 'getBookHistory',
  })
  @ApiParam({ name: 'id', description: 'Book ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns borrowing history for the book',
    type: [BookBorrowHistoryDto],
  })
  @Get(':id/history')
  getBookHistory(@Param('id') bookId: string): Promise<BookBorrowHistoryDto[]> {
    return this.borrowRecordRepository.find({
      where: { bookId: parseInt(bookId) },
      relations: ['borrower'],
      order: { borrowedAt: 'DESC' },
    });
  }
}
