import { UserDto } from '@lib/assets/dto';
import { ApiSchema, PickType } from '@nestjs/swagger';

@ApiSchema({ name: 'Login' })
export class LoginDto extends PickType(UserDto, ['email', 'password']) {}
