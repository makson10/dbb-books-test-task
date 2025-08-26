import { OmitType, ApiSchema } from '@nestjs/swagger';
import { UserDto } from '@lib/assets/dto';

@ApiSchema({ name: 'ResponseUser' })
export class ResponseUserDto extends OmitType(UserDto, ['password']) {}
