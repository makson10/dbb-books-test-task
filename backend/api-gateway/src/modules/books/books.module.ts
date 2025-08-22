import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/common/entities/book.entity';
import { BooksController } from './books.controller';
import { Author } from '@/common/entities/author.entity';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { Publisher } from '@/common/entities/publisher.entity';
import { Genre } from '@/common/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Publisher, Genre, BorrowRecord]),
  ],
  controllers: [BooksController],
})
export class BooksModule {}
