import { Genre } from '@/common/entities/genre.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  getGenres() {
    return this.genreRepository.find();
  }

  @Post()
  //   createGenres(@Body() newGenre: GenreDto) {
  createGenres() {
    const newGenre: GenreDto = {
      name: faker.book.genre(),
    };
    const genre = this.genreRepository.create(newGenre);
    return this.genreRepository.save(genre);
  }
}
