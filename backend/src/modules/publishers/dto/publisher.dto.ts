import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';

@ApiSchema()
export class PublisherDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Publisher name', example: 'Scribner' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Year publisher was established', example: 1846 })
  @IsNumber()
  @Validate(
    (value: number) => value > 1400 && value <= new Date().getFullYear(),
    {
      message: 'establishedYear must be a reasonable year',
    },
  )
  establishedYear: number;
}
