import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class BookAndUserCheckGuard implements CanActivate {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { body: parameters } = request;

    const book = await this.bookRepository.findOne({
      where: { title: parameters.bookTitle },
    });

    if (!book || book.copiesAvailable <= 0) {
      throw new BadRequestException(
        `Book with title ${parameters.bookTitle} not found or unavailable.`,
      );
    }

    const user = await this.userRepository.findOne({
      where: { name: parameters.userFullName },
    });

    if (!user) {
      throw new BadRequestException(
        `User with name ${parameters.userFullName} not found.`,
      );
    }

    request['book'] = book;
    request['user'] = user;

    return true;
  }
}
