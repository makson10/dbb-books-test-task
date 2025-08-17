import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, Validate, IsNumber, IsDateString } from 'class-validator';

@ApiSchema()
export class AuthorDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsDateString()
  @Validate((value) => value < new Date(), {
    message: 'birthDate must be in the past',
  })
  birthDate: Date;
}
