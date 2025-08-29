import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { Genre } from '@lib/assets/entities';
import { DatabaseModule } from '@lib/assets/modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([Genre]),
  ],
  controllers: [GenresController],
})
export class GenresModule {}
