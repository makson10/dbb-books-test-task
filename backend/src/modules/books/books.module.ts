import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/common/entities/book.entity';
import { BooksController } from './books.controller';
import { Author } from '@/common/entities/author.entity';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, BorrowRecord])],
  controllers: [BooksController],
})
export class BooksModule {}
