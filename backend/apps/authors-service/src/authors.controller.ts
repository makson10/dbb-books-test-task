import { Author } from './entities/author.entity';
import { Body, Controller, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorDto } from './dto/author.dto';
import { BookDto } from './dto/book.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  @MessagePattern({ cmd: 'getAllAuthors' })
  getAllAuthors(): Promise<AuthorDto[]> {
    return this.authorsRepository.find({
      relations: ['books'],
    });
  }

  @MessagePattern({ cmd: 'createAuthor' })
  createAuthor(@Body() newAuthor: CreateAuthorDto): Promise<AuthorDto> {
    const author = this.authorsRepository.create(newAuthor);
    return this.authorsRepository.save(author);
  }

  @MessagePattern({ cmd: 'getAllAuthorBooks' })
  async getAllAuthorBooks(@Param('id') id: number): Promise<BookDto[]> {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    return author?.books || [];
  }
}
