import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { Token } from '@lib/assets/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private userClient: ClientProxy) {}

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
  getAllUsers(): Observable<ResponseUserDto[]> {
    return this.userClient.send({ cmd: 'get_all_users' }, {});
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
  createUser(@Body() newUser: CreateUserDto): Observable<AuthResponseDto> {
    return this.userClient.send({ cmd: 'create_user' }, newUser);
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
  login(@Body() loginDto: LoginDto): Observable<AuthResponseDto> {
    return this.userClient.send({ cmd: 'login' }, loginDto);
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
  verifyToken(@Token() token: string): Observable<TokenPayloadDto> {
    return this.userClient.send({ cmd: 'verify_token' }, token);
  }
}
