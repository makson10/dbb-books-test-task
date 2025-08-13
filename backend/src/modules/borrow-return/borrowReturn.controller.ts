import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '@/common/entities/book.entity';
import { User } from '@/common/entities/user.entity';
import { BookAndUserCheckGuard } from '@/common/guard/bookAndUserCheck.guard';
import { Request } from 'express';

@ApiTags('return')
@Controller('return')
export class BorrowReturnController {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRecordRepository: Repository<BorrowRecord>,
  ) {}

  //! add check to ensure all date comparison is working okay
  @UseGuards(BookAndUserCheckGuard)
  @Post()
  async checkIsUserBorrowBookAndDontReturn(
    @Req()
    request: Request & { book: Book; user: User },
  ) {
    const { book, user } = request;

    const borrowRecord = await this.borrowRecordRepository.findOne({
      where: { borrower: user, book },
    });

    return {
      wasBorrowedAndNoReturned: Boolean(
        borrowRecord && !borrowRecord?.returnedAt,
      ),
    };
  }
}
