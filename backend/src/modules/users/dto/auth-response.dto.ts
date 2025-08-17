import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { UserDto } from './user.dto';

@ApiSchema()
export class AuthResponseDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  token: string;
}
