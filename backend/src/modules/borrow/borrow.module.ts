import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { Book } from '@/common/entities/book.entity';
import { User } from '@/common/entities/user.entity';
import { BorrowService } from './borrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord, Book, User])],
  controllers: [BorrowController],
  providers: [BorrowService],
  exports: [BorrowService],
})
export class BorrowModule {}
