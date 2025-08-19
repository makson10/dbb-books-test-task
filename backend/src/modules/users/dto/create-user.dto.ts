import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

@ApiSchema({ name: 'CreateUser' })
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
