import { User, UserRole } from '@/common/entities/user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { faker } from '@faker-js/faker';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //! remove it later
  @Get()
  getUsers() {
    return this.userRepository.find();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    tags: ['users'],
    operationId: 'createUser',
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  // change to Dto
  createUser() {
    const newUser: UserDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: UserRole.USER,
    };
    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }
}
