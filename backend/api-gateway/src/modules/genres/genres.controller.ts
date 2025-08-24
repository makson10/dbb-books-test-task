import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GenreDto } from './dto/genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
import { RolesGuard } from '@/common/guard/roles.guard';
import { UserGuard } from '@/common/guard/user.guard';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UserRole } from '@/common/entities/user.entity';
import { Roles } from '@/common/decorators/roles.decorator';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(@Inject('GENRES_SERVICE') private client: ClientProxy) {}

  @Get()
  @ApiOperation({
    summary: 'Get all genres',
    tags: ['genres'],
    operationId: 'getGenres',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all available genres',
    type: [GenreDto],
  })
  getGenres(): Observable<GenreDto[]> {
    return this.client.send<GenreDto[]>({ cmd: 'get_genres' }, {});
  }

  @ApiOperation({
    summary: 'Create a new genre',
    tags: ['genres'],
    operationId: 'createGenre',
  })
  @ApiResponse({
    status: 201,
    description: 'Genre created successfully',
    type: GenreDto,
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserGuard, RolesGuard)
  @Post()
  createGenres(@Body() newGenre: CreateGenreDto): Observable<GenreDto> {
    return this.client.send<GenreDto>({ cmd: 'create_genre' }, newGenre);
  }
}
