import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, Validate } from 'class-validator';

export class AuthorDto {
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
