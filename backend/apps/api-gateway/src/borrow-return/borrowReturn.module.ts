import { Module } from '@nestjs/common';
import { BorrowReturnController } from './borrowReturn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord, Book, User } from '@lib/assets/entities';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord, Book, User])],
  controllers: [BorrowReturnController],
})
export class BorrowReturnModule {}
