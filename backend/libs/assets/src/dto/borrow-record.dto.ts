import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { BookDto, UserDto } from '.';
import { IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

@ApiSchema({ name: 'BorrowRecord' })
export class BorrowRecordDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDateString()
  borrowedAt: Date;

  @ApiProperty({ nullable: true })
  @IsDateString()
  returnedAt: Date | null;

  @ApiProperty({ type: () => BookDto })
  @Type(() => BookDto)
  book: BookDto;

  @ApiProperty({ type: () => UserDto })
  @Type(() => UserDto)
  borrower: UserDto;
}
