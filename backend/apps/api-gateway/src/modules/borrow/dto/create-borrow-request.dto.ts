import { Book } from '@api/common/entities/book.entity';
import { User } from '@api/common/entities/user.entity';
import { Request as RequestType } from 'express';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateBorrowRequest' })
export class CreateBorrowRequestDto {
  request: RequestType;
  book: Book;
  user: User;
}
