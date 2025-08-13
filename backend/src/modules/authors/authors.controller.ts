import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { Author } from '@/common/entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  @Post('create-author')
  createAuthor() {
    const newUser = this.authorsRepository.create({
      fullName: `Author ${Math.round(Math.random() * 1000)}`,
      birthDate: new Date('1990-01-01'),
    });
    return this.authorsRepository.save(newUser);
  }

  @Get()
  getAllAuthors() {
    return this.authorsRepository.find();
  }
}
