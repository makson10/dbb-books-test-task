import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { Author, Book, Genre, Publisher, User } from '@lib/assets/entities';

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
  ],
  controllers: [GenresController],
})
export class GenresModule {}
