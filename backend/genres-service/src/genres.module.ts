import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { ConfigModule } from '@nestjs/config';
import { Book } from './entities/book.entity';
import { Publisher } from './entities/publisher.entity';
import { User } from './entities/user.entity';
import { Author } from './entities/author.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Author, Book, Genre, Publisher, User],
    }),
    TypeOrmModule.forFeature([Genre]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST,
          port: Number(process.env.AUTH_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [GenresController],
})
export class GenresModule {}
