import { Publisher } from '@/common/entities/publisher.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Get all publishers',
    tags: ['publishers'],
    operationId: 'getAllPublishers',
  })
  @ApiResponse({ status: 200, description: 'Returns all available publishers' })
  getAllPublishers() {
    return this.publisherRepository.find();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new publisher',
    tags: ['publishers'],
    operationId: 'createPublisher',
  })
  @ApiResponse({ status: 201, description: 'Publisher created successfully' })
  // change to Dto
  createPublisher() {
    const newPublisher: Omit<PublisherDto, 'id'> = {
      name: faker.company.name(),
      establishedYear: faker.date.past({ years: 600 }).getFullYear(),
    };
    const publisher = this.publisherRepository.create(newPublisher);
    return this.publisherRepository.save(publisher);
  }
}
