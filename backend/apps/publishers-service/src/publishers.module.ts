import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '@lib/assets/entities';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@lib/assets/modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([Publisher]),
  ],
  controllers: [PublishersController],
})
export class PublishersModule {}
