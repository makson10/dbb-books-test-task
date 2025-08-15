import { Module } from '@nestjs/common';
import { BorrowReturnController } from './borrowReturn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { Book } from '@/common/entities/book.entity';
import { User } from '@/common/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord, Book, User])],
  controllers: [BorrowReturnController],
})
export class BorrowReturnModule {}
