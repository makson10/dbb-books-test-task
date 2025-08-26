import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Book,
  BorrowRecord,
  Author,
  Genre,
  Publisher,
} from '@lib/assets/entities';
import { BorrowService } from './borrow.service';
import { ConfigModule } from '@nestjs/config';

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
    TypeOrmModule.forFeature([BorrowRecord, Book, User]),
  ],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
