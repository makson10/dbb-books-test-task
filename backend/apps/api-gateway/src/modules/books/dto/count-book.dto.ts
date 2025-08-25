import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CountBook' })
export class CountBookDto {
  @ApiProperty()
  count: number;
}
