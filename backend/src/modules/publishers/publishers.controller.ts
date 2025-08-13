import { Publisher } from '@/common/entities/publisher.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherDto } from './dto/publisher.dto';
import { faker } from '@faker-js/faker';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  @Get()
  getAllPublishers() {
    return this.publisherRepository.find();
  }

  @Post()
  //   createPublisher(@Body() newPublisher: PublisherDto) {
  createPublisher() {
    const newPublisher: PublisherDto = {
      name: faker.company.name(),
      establishedYear: faker.date.past({ years: 600 }).getFullYear(),
    };
    const publisher = this.publisherRepository.create(newPublisher);
    return this.publisherRepository.save(publisher);
  }
}
