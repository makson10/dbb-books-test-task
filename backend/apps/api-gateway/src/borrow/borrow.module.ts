import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Book, BorrowRecord } from '@lib/assets/entities';
import { BorrowService } from './borrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord, Book, User])],
  controllers: [BorrowController],
  providers: [BorrowService],
  exports: [BorrowService],
})
export class BorrowModule {}
