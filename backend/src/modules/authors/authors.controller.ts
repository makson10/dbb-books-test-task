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
import { AuthorDto } from './dto/author.dto';
import { faker } from '@faker-js/faker';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/entities/user.entity';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UserGuard } from '@/common/guard/user.guard';
import { RolesGuard } from '@/common/guard/roles.guard';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  //! remove it later
  @Get()
  getAllAuthors() {
    return this.authorsRepository.find();
  }

  @ApiOperation({
    summary: 'Get all books by author ID',
    tags: ['authors'],
    operationId: 'getAllAuthorBooks',
  })
  @ApiParam({ name: 'id', description: 'Author ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns books for the specified author',
  })
  @Get('/:id/books')
  getAllAuthorBooks(@Param('id') id: number) {
    return this.authorsRepository.find({
      where: { id },
      relations: ['books'],
      select: { books: true },
    });
  }

  @ApiOperation({
    summary: 'Create a new author',
    tags: ['authors'],
    operationId: 'createAuthor',
  })
  @ApiResponse({ status: 201, description: 'Author created successfully' })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserGuard, RolesGuard)
  @Post()
  createAuthor(@Body() newAuthor: CreateAuthorDto) {
    const author = this.authorsRepository.create(newAuthor);
    return this.authorsRepository.save(author);
  }
}
