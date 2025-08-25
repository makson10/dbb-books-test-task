import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@api/common/entities/book.entity';
import { BooksController } from './books.controller';
import { Author } from '@api/common/entities/author.entity';
import { BorrowRecord } from '@api/common/entities/borrow-record.entity';
import { Publisher } from '@api/common/entities/publisher.entity';
import { Genre } from '@api/common/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Publisher, Genre, BorrowRecord]),
  ],
  controllers: [BooksController],
})
export class BooksModule {}
