import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { PublishersModule } from './publishers/publishers.module';
import { BorrowModule } from './borrow/borrow.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BorrowReturnModule } from './borrow-return/borrowReturn.module';
import { GlobalClientsModule } from './global-client/GlobalClientsModule.module';
import {
  Author,
  Book,
  Genre,
  Publisher,
  BorrowRecord,
  User,
} from '@lib/assets/entities';
// import * as dotenv from 'dotenv';
// dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    GlobalClientsModule,
    BooksModule, // ✅
    AuthorsModule, // ✅
    GenresModule, // ✅
    PublishersModule,
    BorrowModule,
    BorrowReturnModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Author, Book, Genre, Publisher, BorrowRecord, User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
