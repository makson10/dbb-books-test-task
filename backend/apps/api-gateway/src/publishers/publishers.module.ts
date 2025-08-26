import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '@lib/assets/entities';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  controllers: [PublishersController],
  providers: [JwtService, AuthService],
})
export class PublishersModule {}
