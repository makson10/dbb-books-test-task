import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherDto } from '@lib/assets/dto';
import { UserRole, Publisher } from '@lib/assets/entities';
import { Roles } from '@lib/assets/decorators';
import { JwtAuthGuard, RolesGuard, UserGuard } from '@lib/assets/guards';
import { CreatePublisherDto } from './dto/create-publisher.dto';

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
  @ApiResponse({
    status: 200,
    description: 'Returns all available publishers',
    type: [PublisherDto],
  })
  getAllPublishers(): Promise<PublisherDto[]> {
    return this.publisherRepository.find();
  }

  @ApiOperation({
    summary: 'Create a new publisher',
    tags: ['publishers'],
    operationId: 'createPublisher',
  })
  @ApiResponse({
    status: 201,
    description: 'Publisher created successfully',
    type: PublisherDto,
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, UserGuard, RolesGuard)
  @Post()
  createPublisher(
    @Body() newPublisher: CreatePublisherDto,
  ): Promise<PublisherDto> {
    const publisher = this.publisherRepository.create(newPublisher);
    return this.publisherRepository.save(publisher);
  }
}
