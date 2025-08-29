import { Body, Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Book,
  Author,
  BorrowRecord,
  Genre,
  Publisher,
} from '@lib/assets/entities';
import { BookDto } from '@lib/assets/dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { GetAllBooksDto } from './dto/get-all-books.dto';
import { BookWithRelationsDto } from './dto/book-with-relations.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { CountBookDto } from './dto/count-book.dto';
import { BookBorrowHistoryDto } from './dto/book-borrow-history.dto';

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

  @MessagePattern({ cmd: 'get_all_books' })
  getAllBooks(
    @Body() parameters: GetAllBooksDto,
  ): Promise<BookWithRelationsDto[]> {
    return this.booksRepository.find({
      take: parameters.limit,
      skip: (parameters.page - 1) * parameters.limit,
      order: { [parameters.sortBy]: parameters.order },
      relations: ['authors', 'publisher', 'genres'],
    });
  }

  @MessagePattern({ cmd: 'create_book' })
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

  @MessagePattern({ cmd: 'get_book_count' })
  async getBookCount(): Promise<CountBookDto> {
    return { count: await this.booksRepository.count() };
  }

  @MessagePattern({ cmd: 'get_book_details' })
  getBookDetails(
    @Body('bookId') bookId: string,
  ): Promise<BookWithRelationsDto | null> {
    return this.booksRepository.findOne({
      where: { id: parseInt(bookId) },
      relations: ['authors', 'publisher', 'genres'],
    });
  }

  @MessagePattern({ cmd: 'get_book_by_title' })
  getBookByTitle(
    @Body() bookTitle: string,
  ): Promise<BookWithRelationsDto | null> {
    return this.booksRepository.findOne({
      where: { title: bookTitle },
    });
  }

  @MessagePattern({ cmd: 'get_book_history' })
  async getBookHistory(
    @Body('bookId') bookId: string,
  ): Promise<BookBorrowHistoryDto[]> {
    const [results, count] = await this.borrowRecordRepository.findAndCount({
      where: { bookId: parseInt(bookId) },
      relations: ['borrower'],
      order: { borrowedAt: 'DESC' },
    });

    if (count === 0) throw new RpcException('No borrow history found');
    return results;
  }
}
