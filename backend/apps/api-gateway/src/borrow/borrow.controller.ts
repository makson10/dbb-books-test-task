import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BookAndUserCheckGuard } from '@lib/assets/guards';
import { CreateBorrowBookDto } from './dto/create-borrow.dto';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';
import { BorrowRecordDto } from '@lib/assets/dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BorrowStatusDto } from './dto/borrow-status';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {
  constructor(
    @Inject('BORROW_SERVICE')
    private borrowClient: ClientProxy,
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
  getAllBorrowRecords(): Observable<BorrowRecordDto[]> {
    return this.borrowClient.send({ cmd: 'get_all_borrow_records' }, {});
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
  borrowBook(
    @Req() request: CreateBorrowRequestDto,
  ): Observable<BorrowRecordDto> {
    return this.borrowClient.send({ cmd: 'borrow_book' }, request);
  }

  @ApiOperation({
    summary: 'Check if user has borrowed a book and not returned it',
    tags: ['borrow'],
    operationId: 'checkUserBorrowBook',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns borrowing status for the book and user',
    type: BorrowStatusDto,
  })
  @ApiBody({ type: CreateBorrowBookDto })
  @UseGuards(BookAndUserCheckGuard)
  @Post('/return')
  checkUserBorrowBook(
    @Req()
    request: CreateBorrowRequestDto,
  ): Observable<BorrowStatusDto> {
    return this.borrowClient.send(
      { cmd: 'check_user_borrow_book' },
      { user: request.user, book: request.book },
    );
  }
}
