import { UserDto } from '@lib/assets/dto';
import { ApiSchema, PickType } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateUser' })
export class CreateUserDto extends PickType(UserDto, [
  'name',
  'email',
  'password',
]) {}
