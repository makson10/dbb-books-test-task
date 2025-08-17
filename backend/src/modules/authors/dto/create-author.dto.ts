import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, Validate, IsDateString } from 'class-validator';

@ApiSchema({ name: 'CreateAuthor' })
export class CreateAuthorDto {
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
