import { Module } from '@nestjs/common';
import { BorrowReturnController } from './borrowReturn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord } from '@api/common/entities/borrow-record.entity';
import { Book } from '@api/common/entities/book.entity';
import { User } from '@api/common/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord, Book, User])],
  controllers: [BorrowReturnController],
})
export class BorrowReturnModule {}
