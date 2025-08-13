import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {}
