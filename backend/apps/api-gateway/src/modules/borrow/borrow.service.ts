import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowRecord } from '@api/common/entities/borrow-record.entity';
import { Repository } from 'typeorm';
import { User } from '@api/common/entities/user.entity';
import { Book } from '@api/common/entities/book.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowRecord)
    private borrowRecordRepository: Repository<BorrowRecord>,
  ) {}

  public async ensureUserCanBorrow(user: User) {
    const userBorrowedBooksCount = await this.borrowRecordRepository.count({
      where: { borrower: user },
    });

    if (userBorrowedBooksCount > 5) {
      throw new BadRequestException(
        `User ${user.name} has reached the maximum limit of borrowed books.`,
      );
    }
  }

  public async ensureUserDoesNotHaveBook(user: User, book: Book) {
    const existingRecord = await this.borrowRecordRepository.findOne({
      where: { book, borrower: user },
    });

    if (existingRecord) {
      throw new BadRequestException(
        `User ${user.name} has already borrowed this book.`,
      );
    }
  }

  public async createBorrowRecord(user: User, book: Book) {
    const newBorrowRecord = this.borrowRecordRepository.create({
      borrower: user,
      book,
    });

    return this.borrowRecordRepository.save(newBorrowRecord);
  }
}
