import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, IsDate, Validate, IsNumber } from 'class-validator';

@ApiSchema()
export class AuthorDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsDate()
  @Validate((value) => value < new Date(), {
    message: 'birthDate must be in the past',
  })
  birthDate: Date;
}
