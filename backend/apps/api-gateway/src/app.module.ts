import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { PublishersModule } from './publishers/publishers.module';
import { BorrowModule } from './borrow/borrow.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GlobalClientsModule } from './global-client/GlobalClientsModule.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GlobalClientsModule,
    BooksModule,
    AuthorsModule,
    GenresModule,
    PublishersModule,
    BorrowModule,
    UsersModule,
  ],
})
export class AppModule {}
