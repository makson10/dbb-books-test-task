import { Genre } from '@/common/entities/genre.entity';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreDto } from './dto/genre.dto';
import { faker } from '@faker-js/faker';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/entities/user.entity';
import { RolesGuard } from '@/common/guard/roles.guard';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UserGuard } from '@/common/guard/user.guard';

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

  @ApiOperation({
    summary: 'Create a new genre',
    tags: ['genres'],
    operationId: 'createGenre',
  })
  @ApiResponse({ status: 201, description: 'Genre created successfully' })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserGuard, RolesGuard)
  @Post()
  createGenres(@Body() newGenre: CreateGenreDto): Promise<GenreDto> {
    const genre = this.genreRepository.create(newGenre);
    return this.genreRepository.save(genre);
  }
}
