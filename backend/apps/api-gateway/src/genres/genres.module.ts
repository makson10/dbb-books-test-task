import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  controllers: [GenresController],
  providers: [JwtService, AuthService],
})
export class GenresModule {}
