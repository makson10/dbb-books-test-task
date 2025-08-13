import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {}
