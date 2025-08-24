import { BorrowRecordDto } from './borrow-record.dto';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { OmitType } from '@nestjs/swagger/dist/type-helpers';

@ApiSchema({ name: 'BookBorrowHistory' })
export class BookBorrowHistoryDto extends OmitType(BorrowRecordDto, ['book']) {
  @ApiProperty()
  bookId: number;

  @ApiProperty()
  borrowerId: number;
}
