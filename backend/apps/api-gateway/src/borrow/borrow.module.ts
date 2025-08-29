import { Module } from '@nestjs/common';
import { BorrowController } from './borrow.controller';

@Module({
  controllers: [BorrowController],
})
export class BorrowModule {}
