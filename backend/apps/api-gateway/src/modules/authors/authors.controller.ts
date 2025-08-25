import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Roles } from '@api/common/decorators/roles.decorator';
import { UserRole } from '@api/common/entities/user.entity';
import { JwtAuthGuard } from '@api/common/guard/jwt-auth.guard';
import { UserGuard } from '@api/common/guard/user.guard';
import { RolesGuard } from '@api/common/guard/roles.guard';
import { AuthorDto } from './dto/author.dto';
import { BookDto } from '../books/dto/book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(@Inject('AUTHORS_SERVICE') private authorsService: ClientProxy) {}

  @ApiOperation({
    summary: 'Get all authors',
    tags: ['authors'],
    operationId: 'getAllAuthors',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all authors',
    type: [AuthorDto],
  })
  @Get()
  getAllAuthors(): Observable<AuthorDto[]> {
    return this.authorsService.send({ cmd: 'getAllAuthors' }, {});
  }

  @ApiOperation({
    summary: 'Create a new author',
    tags: ['authors'],
    operationId: 'createAuthor',
  })
  @ApiResponse({
    status: 201,
    description: 'Author created successfully',
    type: AuthorDto,
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserGuard, RolesGuard)
  @Post()
  createAuthor(@Body() newAuthor: CreateAuthorDto): Observable<AuthorDto> {
    return this.authorsService.send({ cmd: 'createAuthor' }, newAuthor);
  }

  @ApiOperation({
    summary: 'Get all books by author ID',
    tags: ['authors'],
    operationId: 'getAllAuthorBooks',
  })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns books for the specified author',
    type: [BookDto],
  })
  @Get('/:id/books')
  getAllAuthorBooks(@Param('id') id: number): Observable<BookDto[]> {
    return this.authorsService.send({ cmd: 'getAllAuthorBooks' }, { id });
  }
}
