import { ApiSchema, PickType } from '@nestjs/swagger';
import { UserDto } from '@lib/assets/dto';

@ApiSchema({ name: 'TokenPayload' })
export class TokenPayloadDto extends PickType(UserDto, [
  'id',
  'name',
  'role',
]) {}
