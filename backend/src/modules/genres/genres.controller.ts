import { Genre } from '@/common/entities/genre.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreDto } from './dto/genre.dto';
import { faker } from '@faker-js/faker';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all genres',
    tags: ['genres'],
    operationId: 'getGenres',
  })
  @ApiResponse({ status: 200, description: 'Returns all available genres' })
  getGenres() {
    return this.genreRepository.find();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new genre',
    tags: ['genres'],
    operationId: 'createGenre',
  })
  @ApiResponse({ status: 201, description: 'Genre created successfully' })
  // change to Dto
  createGenres() {
    const newGenre: Omit<GenreDto, 'id'> = {
      name: faker.book.genre(),
    };
    const genre = this.genreRepository.create(newGenre);
    return this.genreRepository.save(genre);
  }
}
