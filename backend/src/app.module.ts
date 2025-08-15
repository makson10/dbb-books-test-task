import { Module } from '@nestjs/common';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { GenresModule } from './modules/genres/genres.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { BorrowModule } from './modules/borrow/borrow.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '@/common/entities/author.entity';
import { Book } from '@/common/entities/book.entity';
import { Genre } from '@/common/entities/genre.entity';
import { Publisher } from '@/common/entities/publisher.entity';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { User } from '@/common/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { BorrowReturnModule } from './modules/borrow-return/borrowReturn.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BooksModule,
    AuthorsModule,
    GenresModule,
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
  controllers: [],
  providers: [],
})
export class AppModule {}
