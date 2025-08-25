import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowRecord } from '@api/common/entities/borrow-record.entity';
import { Repository } from 'typeorm';
import { BorrowService } from './borrow.service';
import { BookAndUserCheckGuard } from '@api/common/guard/bookAndUserCheck.guard';
import { CreateBorrowBookDto } from './dto/create-borrow.dto';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';
import { BorrowRecordDto } from './dto/borrow-record.dto';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRecordRepository: Repository<BorrowRecord>,
    private borrowService: BorrowService,
  ) {}

  @ApiOperation({
    summary: 'Get all borrow records',
    tags: ['borrow'],
    operationId: 'getAllBorrowRecords',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all borrow records',
    type: [BorrowRecordDto],
  })
  @Get()
  async getAllBorrowRecords(): Promise<BorrowRecordDto[]> {
    return this.borrowRecordRepository
      .find({
        relations: ['book', 'borrower'],
      })
      .then((records) =>
        records.map((record) => ({
          ...record,
          bookId: undefined,
          borrowerId: undefined,
        })),
      );
  }

  @ApiOperation({
    summary: 'Borrow a book',
    tags: ['borrow'],
    operationId: 'borrowBook',
  })
  @ApiResponse({
    status: 201,
    description: 'Book borrowed successfully',
    type: BorrowRecordDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User has reached maximum limit of borrowed books',
  })
  @ApiBody({ type: CreateBorrowBookDto })
  @UseGuards(BookAndUserCheckGuard)
  @Post()
  async borrowBook(
    @Req() request: CreateBorrowRequestDto,
  ): Promise<BorrowRecordDto> {
    const { book, user } = request;

    await this.borrowService.ensureUserCanBorrow(user);
    await this.borrowService.ensureUserDoesNotHaveBook(user, book);

    return this.borrowService.createBorrowRecord(user, book);
  }
}
