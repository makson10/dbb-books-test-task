import { Book, User } from '@lib/assets/entities';
import { Request as RequestType } from 'express';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateBorrowRequest' })
export class CreateBorrowRequestDto {
  request: RequestType;
  book: Book;
  user: User;
}
