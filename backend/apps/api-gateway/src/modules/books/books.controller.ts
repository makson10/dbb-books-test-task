import { Book } from '@api/common/entities/book.entity';
import {
  Body,
  Controller,
  Get,
  Inject,
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
import { Author } from '@api/common/entities/author.entity';
import { BorrowRecord } from '@api/common/entities/borrow-record.entity';
import { BookWithRelationsDto } from './dto/book-with-relations.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Publisher } from '@api/common/entities/publisher.entity';
import { Genre } from '@api/common/entities/genre.entity';
import { UserRole } from '@api/common/entities/user.entity';
import { JwtAuthGuard } from '@api/common/guard/jwt-auth.guard';
import { UserGuard } from '@api/common/guard/user.guard';
import { RolesGuard } from '@api/common/guard/roles.guard';
import { Roles } from '@api/common/decorators/roles.decorator';
import { CountBookDto } from './dto/count-book.dto';
import { BookDto } from './dto/book.dto';
import { BookBorrowHistoryDto } from './dto/book-borrow-history.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @Inject('BOOKS_SERVICE')
    private booksService: ClientProxy,
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
  ): Observable<BookWithRelationsDto[]> {
    return this.booksService.send({ cmd: 'get_all_books' }, parameters);
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
  createBook(@Body() newBook: CreateBookDto): Observable<BookDto> {
    return this.booksService.send({ cmd: 'create_book' }, newBook);
  }

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
  @Get('count')
  getBookCount(): Observable<CountBookDto> {
    return this.booksService.send({ cmd: 'get_book_count' }, {});
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
  ): Observable<BookWithRelationsDto | null> {
    return this.booksService.send({ cmd: 'get_book_details' }, { bookId });
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
  getBookHistory(
    @Param('id') bookId: string,
  ): Observable<BookBorrowHistoryDto[]> {
    return this.booksService.send({ cmd: 'get_book_history' }, { bookId });
  }
}
