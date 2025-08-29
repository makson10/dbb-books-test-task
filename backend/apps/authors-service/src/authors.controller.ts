import { Author } from '@lib/assets/entities';
import { Body, Controller, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorDto, BookDto } from '@lib/assets/dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  @MessagePattern({ cmd: 'get-all-authors' })
  getAllAuthors(): Promise<AuthorDto[]> {
    return this.authorsRepository.find({
      relations: ['books'],
    });
  }

  @MessagePattern({ cmd: 'create-author' })
  createAuthor(@Body() newAuthor: CreateAuthorDto): Promise<AuthorDto> {
    const author = this.authorsRepository.create(newAuthor);
    return this.authorsRepository.save(author);
  }

  @MessagePattern({ cmd: 'get-all-author-books' })
  async getAllAuthorBooks(@Param('id') id: number): Promise<BookDto[]> {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    return author?.books || [];
  }
}
