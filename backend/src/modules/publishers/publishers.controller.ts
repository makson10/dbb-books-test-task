import { Publisher } from '@/common/entities/publisher.entity';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherDto } from './dto/publisher.dto';
import { UserRole } from '@/common/entities/user.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { UserGuard } from '@/common/guard/user.guard';
import { RolesGuard } from '@/common/guard/roles.guard';
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
  @ApiResponse({ status: 200, description: 'Returns all available publishers' })
  getAllPublishers(): Promise<Publisher[]> {
    return this.publisherRepository.find();
  }

  @ApiOperation({
    summary: 'Create a new publisher',
    tags: ['publishers'],
    operationId: 'createPublisher',
  })
  @ApiResponse({ status: 201, description: 'Publisher created successfully' })
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
