import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowRecord } from '@/common/entities/borrow-record.entity';
import { Repository } from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { Book } from '@/common/entities/book.entity';
import { BookAndUserCheckGuard } from '@/common/guard/bookAndUserCheck.guard';
import type { Request } from 'express';
import { BorrowBookDto } from './dto/borrowBook.dto';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRecordRepository: Repository<BorrowRecord>,
  ) {}

  //! remove it later
  @Get()
  async getBorrowRecords() {
    return this.borrowRecordRepository.find({
      relations: ['borrower', 'book'],
    });
  }

  @ApiOperation({
    summary: 'Borrow a book',
    tags: ['borrow'],
    operationId: 'borrowBook',
  })
  @ApiResponse({ status: 201, description: 'Book borrowed successfully' })
  @ApiResponse({
    status: 400,
    description: 'User has reached maximum limit of borrowed books',
  })
  @ApiBody({ type: BorrowBookDto })
  @UseGuards(BookAndUserCheckGuard)
  @Post()
  async borrowBook(@Req() request: Request & { book: Book; user: User }) {
    const { book, user } = request;

    const userBorrowedBooksCount = await this.borrowRecordRepository.count({
      where: { borrower: user },
    });

    if (userBorrowedBooksCount > 5) {
      throw new BadRequestException(
        `User ${user.name} has reached the maximum limit of borrowed books.`,
      );
    }

    const newBorrowRecord = this.borrowRecordRepository.create({
      borrower: user,
      book,
    });

    return this.borrowRecordRepository.save(newBorrowRecord);
  }
}
