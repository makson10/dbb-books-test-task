import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';

@Module({
  controllers: [PublishersController],
})
export class PublishersModule {}
