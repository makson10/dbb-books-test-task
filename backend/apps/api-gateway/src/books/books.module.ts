import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Book,
  Author,
  Publisher,
  Genre,
  BorrowRecord,
} from '@lib/assets/entities';
import { BooksController } from './books.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Publisher, Genre, BorrowRecord]),
  ],
  controllers: [BooksController],
})
export class BooksModule {}
