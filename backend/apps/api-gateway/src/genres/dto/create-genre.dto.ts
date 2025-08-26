import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@ApiSchema({ name: 'CreateGenre' })
export class CreateGenreDto {
  @ApiProperty({ description: 'Genre name', example: 'Fiction' })
  @IsString()
  name: string;
}
