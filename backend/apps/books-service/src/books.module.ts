import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BooksController } from './books.controller';
import { Author } from './entities/author.entity';
import { BorrowRecord } from './entities/borrow-record.entity';
import { Publisher } from './entities/publisher.entity';
import { Genre } from './entities/genre.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Author, Book, Genre, Publisher, BorrowRecord, User],
    }),
    TypeOrmModule.forFeature([Book, Author, Publisher, Genre, BorrowRecord]),
  ],
  controllers: [BooksController],
})
export class BooksModule {}
