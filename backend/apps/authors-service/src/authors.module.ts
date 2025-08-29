import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@lib/assets/modules';
import { Author } from '@lib/assets/entities';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([Author]),
  ],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
