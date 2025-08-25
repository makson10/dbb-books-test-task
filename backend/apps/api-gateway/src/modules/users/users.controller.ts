import { User, UserRole } from '@api/common/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
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
import { Token } from '@api/common/decorators/token.decorator';
import { ResponseUserDto } from './dto/response-user.dto';
import { Roles } from '@api/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@api/common/guard/jwt-auth.guard';
import { UserGuard } from '@api/common/guard/user.guard';
import { RolesGuard } from '@api/common/guard/roles.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
    private authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Get all users',
    tags: ['users'],
    operationId: 'getAllUsers',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [ResponseUserDto],
  })
  @Get()
  async getAllUsers(): Promise<ResponseUserDto[]> {
    return this.userRepository.find().then((users) => {
      return users.map((user) => ({ ...user, password: undefined }));
    });
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

    const safeUser = { ...savedUser } as any;
    delete safeUser.password;

    return {
      user: safeUser as User,
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

    const safeUser = { ...user } as any;
    delete safeUser.password;

    return {
      user: safeUser as User,
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
    if (!payload) throw new UnauthorizedException('Invalid token');
    return payload;
  }
}
