import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/common/entities/book.entity';
import { BooksController } from './books.controller';
import { Author } from '@/common/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BooksController],
})
export class BooksModule {}
