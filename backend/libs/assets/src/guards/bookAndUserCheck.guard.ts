import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookAndUserCheckGuard implements CanActivate {
  constructor(
    @Inject('BOOKS_SERVICE') private booksClient: ClientProxy,
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { body: parameters } = request;

    const book = await lastValueFrom(
      this.booksClient.send({ cmd: 'get_book_by_title' }, parameters.bookTitle),
    );

    if (!book || book.copiesAvailable <= 0) {
      throw new BadRequestException(
        `Book with title ${parameters.bookTitle} not found or unavailable.`,
      );
    }

    const user = await lastValueFrom(
      this.usersClient.send({ cmd: 'get_user_by_name' }, parameters.userName),
    );

    if (!user) {
      throw new BadRequestException(
        `User with name ${parameters.userName} not found.`,
      );
    }

    request['book'] = book;
    request['user'] = user;

    return true;
  }
}
