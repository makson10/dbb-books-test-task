import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ApiSchema({ name: 'CreateBorrowBook' })
export class CreateBorrowBookDto {
  @ApiProperty()
  @IsString()
  bookTitle: string;

  @ApiProperty()
  @IsString()
  userName: string;
}
