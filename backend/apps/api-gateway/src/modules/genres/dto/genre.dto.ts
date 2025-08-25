import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

@ApiSchema({ name: 'Genre' })
export class GenreDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Genre name', example: 'Fiction' })
  @IsString()
  name: string;
}
