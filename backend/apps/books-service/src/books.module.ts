import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { ConfigModule } from '@nestjs/config';
import {
  Author,
  Book,
  Genre,
  Publisher,
  BorrowRecord,
  User,
} from '@lib/assets/entities';

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
