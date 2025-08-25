import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord } from './entities/borrow-record.entity';
import { Book } from './entities/book.entity';
import { Genre } from './entities/genre.entity';
import { Publisher } from './entities/publisher.entity';
import { User } from './entities/user.entity';
import { Author } from './entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Author, Book, Genre, Publisher, BorrowRecord, User],
    }),
    TypeOrmModule.forFeature([Author]),
  ],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
