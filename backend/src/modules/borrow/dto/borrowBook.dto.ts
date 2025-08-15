import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BorrowBookDto {
  @ApiProperty()
  @IsString()
  bookTitle: string;

  @ApiProperty()
  @IsString()
  userName: string;
}
