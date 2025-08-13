import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';

export class PublisherDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Validate(
    (value: number) => value > 1400 && value <= new Date().getFullYear(),
    {
      message: 'establishedYear must be a reasonable year',
    },
  )
  establishedYear: number;
}
