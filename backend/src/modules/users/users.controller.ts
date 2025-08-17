import { User } from '@/common/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from './hash.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { Token } from '@/common/decorators/token.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
    private authService: AuthService,
  ) {}

  //! remove it later
  @Get()
  getUsers() {
    return this.userRepository.find();
  }

  @ApiOperation({
    summary: 'Create a new user',
    tags: ['users'],
    operationId: 'createUser',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: AuthResponseDto,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<AuthResponseDto> {
    const hashedPassword = await this.hashService.hashPassword(
      newUser.password,
    );
    const user = this.userRepository.create({
      ...newUser,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const token = this.authService.generateToken(savedUser);

    return {
      user: savedUser,
      token,
    };
  }

  @ApiOperation({
    summary: 'Login user',
    tags: ['users'],
    operationId: 'login',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.doesPasswordMatch(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken(user);

    return {
      user,
      token,
    };
  }

  @ApiOperation({
    summary: 'Verify JWT token',
    tags: ['users'],
    operationId: 'verifyToken',
  })
  @ApiResponse({
    status: 200,
    description: 'Token is valid',
    type: TokenPayloadDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid token',
  })
  @ApiBearerAuth()
  @Post('verify')
  verifyToken(@Token() token: string): TokenPayloadDto {
    const payload = this.authService.validateToken(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }
}
