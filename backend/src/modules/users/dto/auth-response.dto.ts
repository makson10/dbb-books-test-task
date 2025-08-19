import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { UserDto } from './user.dto';

@ApiSchema({ name: 'AuthResponse' })
export class AuthResponseDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  token: string;
}
