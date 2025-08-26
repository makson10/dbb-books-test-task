import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
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
