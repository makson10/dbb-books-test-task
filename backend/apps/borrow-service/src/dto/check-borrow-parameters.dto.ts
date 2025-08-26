import { Book, User } from '@lib/assets/entities';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CheckBorrowParameters' })
export class CheckBorrowParametersDto {
  book: Book;
  user: User;
}
