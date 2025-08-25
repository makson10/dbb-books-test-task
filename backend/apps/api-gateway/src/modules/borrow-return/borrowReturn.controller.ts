import { BorrowRecord } from '@api/common/entities/borrow-record.entity';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookAndUserCheckGuard } from '@api/common/guard/bookAndUserCheck.guard';
import { CreateBorrowBookDto } from '../borrow/dto/create-borrow.dto';
import { CreateBorrowRequestDto } from '../borrow/dto/create-borrow-request.dto';
import { BorrowStatusDto } from './dto/borrow-status';

@ApiTags('return')
@Controller('return')
export class BorrowReturnController {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRecordRepository: Repository<BorrowRecord>,
  ) {}

  @ApiOperation({
    summary: 'Check if user has borrowed a book and not returned it',
    tags: ['return'],
    operationId: 'checkIsUserBorrowBookAndDontReturn',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns borrowing status for the book and user',
    type: BorrowStatusDto,
  })
  @ApiBody({ type: CreateBorrowBookDto })
  @UseGuards(BookAndUserCheckGuard)
  @Post()
  async checkIsUserBorrowBookAndDontReturn(
    @Req()
    request: CreateBorrowRequestDto,
  ): Promise<BorrowStatusDto> {
    const { book, user } = request;

    const borrowRecord = await this.borrowRecordRepository.findOne({
      where: { borrower: user, book },
    });

    return {
      hasActiveBorrow: Boolean(borrowRecord && !borrowRecord?.returnedAt),
    };
  }
}
