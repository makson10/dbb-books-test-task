import { Body, Controller, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowService } from './borrow.service';
import { BorrowRecord } from '@lib/assets/entities';
import { BorrowRecordDto } from '@lib/assets/dto';
import { MessagePattern } from '@nestjs/microservices';
import { BorrowStatusDto } from './dto/borrow-status';
import { CheckBorrowParametersDto } from './dto/check-borrow-parameters.dto';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';

@Controller('borrow')
export class BorrowController {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRecordRepository: Repository<BorrowRecord>,
    private borrowService: BorrowService,
  ) {}

  @MessagePattern({ cmd: 'get_all_borrow_records' })
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

  @MessagePattern({ cmd: 'borrow_book' })
  async borrowBook(
    @Req() request: CreateBorrowRequestDto,
  ): Promise<BorrowRecordDto> {
    const { book, user } = request;

    await this.borrowService.ensureUserCanBorrow(user);
    await this.borrowService.ensureUserDoesNotHaveBook(user, book);

    return this.borrowService.createBorrowRecord(user, book);
  }

  @MessagePattern({ cmd: 'check_user_borrow_book' })
  async checkUserBorrowBook(
    @Body()
    checkBorrowParameters: CheckBorrowParametersDto,
  ): Promise<BorrowStatusDto> {
    return this.borrowService.checkUserBorrowBook(
      checkBorrowParameters.user,
      checkBorrowParameters.book,
    );
  }
}
