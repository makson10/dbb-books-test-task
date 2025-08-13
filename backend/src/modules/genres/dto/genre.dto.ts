import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenreDto {
  @ApiProperty()
  @IsString()
  name: string;
}
