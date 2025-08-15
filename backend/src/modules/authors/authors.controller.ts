<<<<<<< HEAD
import { Author } from '@/common/entities/author.entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto } from './dto/author.dto';
import { faker } from '@faker-js/faker';

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

  //!   solve bug
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
  @Post()
  // change it to Dto
  createAuthor() {
    const newAuthor: Omit<AuthorDto, 'id'> = {
      fullName: faker.person.fullName(),
      birthDate: faker.date.past({ years: 80 }),
    };
    const author = this.authorsRepository.create(newAuthor);
    return this.authorsRepository.save(author);
  }
}
=======
import { Author } from '@/common/entities/author.entity';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto } from './dto/author.dto';
import { faker } from '@faker-js/faker';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  //! remove it later
  //   @Get()
  //   getAllAuthors() {
  //     return this.authorsRepository.find();
  //   }

  //!   solve bug
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
  @Post()
  // change it to Dto
  createAuthor() {
    const newAuthor: Omit<AuthorDto, 'id'> = {
      fullName: faker.person.fullName(),
      birthDate: faker.date.past({ years: 80 }),
    };
    const author = this.authorsRepository.create(newAuthor);
    return this.authorsRepository.save(author);
  }
}
>>>>>>> 98be518f0af8e8307ef175bb415b5817341ad7f5
