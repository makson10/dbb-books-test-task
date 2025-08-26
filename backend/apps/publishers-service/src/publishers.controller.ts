import { Body, Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherDto } from '@lib/assets/dto';
import { Publisher } from '@lib/assets/entities';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('publishers')
export class PublishersController {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  @MessagePattern({ cmd: 'get_all_publishers' })
  getAllPublishers(): Promise<PublisherDto[]> {
    return this.publisherRepository.find();
  }

  @MessagePattern({ cmd: 'create_publisher' })
  createPublisher(
    @Body() newPublisher: CreatePublisherDto,
  ): Promise<PublisherDto> {
    const publisher = this.publisherRepository.create(newPublisher);
    return this.publisherRepository.save(publisher);
  }
}
