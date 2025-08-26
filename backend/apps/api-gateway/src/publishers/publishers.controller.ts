import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PublisherDto } from '@lib/assets/dto';
import { UserRole } from '@lib/assets/entities';
import { Roles } from '@lib/assets/decorators';
import { JwtAuthGuard, RolesGuard, UserGuard } from '@lib/assets/guards';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(
    @Inject('PUBLISHERS_SERVICE')
    private publishersService: ClientProxy,
  ) {}

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
  @Get()
  getAllPublishers(): Observable<PublisherDto[]> {
    return this.publishersService.send({ cmd: 'get_all_publishers' }, {});
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
  ): Observable<PublisherDto> {
    return this.publishersService.send(
      { cmd: 'create_publisher' },
      newPublisher,
    );
  }
}
