import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'BorrowStatus' })
export class BorrowStatusDto {
  @ApiProperty()
  hasActiveBorrow: boolean;
}
