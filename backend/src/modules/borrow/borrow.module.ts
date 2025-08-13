import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRecord])],
  controllers: [BorrowController],
})
export class BorrowModule {}
