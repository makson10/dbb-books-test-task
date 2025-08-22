import { Author } from '@/common/entities/author.entity';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/entities/user.entity';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UserGuard } from '@/common/guard/user.guard';
import { RolesGuard } from '@/common/guard/roles.guard';
import { AuthorDto } from './dto/author.dto';
import { Book } from '@/common/entities/book.entity';
import { BookDto } from '../books/dto/book.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

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
  getAllAuthors(): Promise<AuthorDto[]> {
    return this.authorsRepository.find({
      relations: ['books'],
    });
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
  createAuthor(@Body() newAuthor: CreateAuthorDto): Promise<AuthorDto> {
    const author = this.authorsRepository.create(newAuthor);
    return this.authorsRepository.save(author);
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
  getAllAuthorBooks(@Param('id') id: number): Promise<BookDto[]> {
    return this.authorsRepository
      .findOne({
        where: { id },
        relations: ['books'],
      })
      .then((author) => author?.books || []);
  }
}
