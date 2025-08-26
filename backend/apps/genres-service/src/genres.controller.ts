import { Genre } from '@lib/assets/entities';
import { Body, Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreDto } from '@lib/assets/dto';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('genres')
export class GenresController {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  @MessagePattern({ cmd: 'get_genres' })
  getGenres(): Promise<GenreDto[]> {
    return this.genreRepository.find();
  }

  @MessagePattern({ cmd: 'create_genre' })
  createGenres(@Body() newGenre: CreateGenreDto): Promise<GenreDto> {
    const genre = this.genreRepository.create(newGenre);
    return this.genreRepository.save(genre);
  }
}
