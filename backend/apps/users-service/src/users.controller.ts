import { User } from '@lib/assets/entities';
import {
  Body,
  Controller,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashService } from './hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { Token } from '@lib/assets/decorators';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { UserDto } from '@lib/assets/dto';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private hashService: HashService,

    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_all_users' })
  async getAllUsers(): Promise<ResponseUserDto[]> {
    return this.userRepository.find().then((users) => {
      return users.map((user) => ({ ...user, password: undefined }));
    });
  }

  @MessagePattern({ cmd: 'get_user_by_name' })
  async getUserByName(@Body() userName: string): Promise<UserDto | null> {
    return await this.userRepository.findOne({
      where: { name: userName },
    });
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(@Body() newUser: CreateUserDto): Promise<AuthResponseDto> {
    const hashedPassword = await this.hashService.hashPassword(
      newUser.password,
    );
    const user = this.userRepository.create({
      ...newUser,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const token = await lastValueFrom<string>(
      this.authClient.send({ cmd: 'generate_token' }, savedUser),
    );

    const safeUser = { ...savedUser } as any;
    delete safeUser.password;

    return {
      user: safeUser as User,
      token,
    };
  }

  @MessagePattern({ cmd: 'login' })
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

    const token = await lastValueFrom<string>(
      this.authClient.send({ cmd: 'generate_token' }, user),
    );

    const safeUser = { ...user } as any;
    delete safeUser.password;

    return {
      user: safeUser as User,
      token,
    };
  }

  @MessagePattern({ cmd: 'verify_token' })
  async verifyToken(@Body() token: string): Promise<TokenPayloadDto> {
    const payload = await lastValueFrom<TokenPayloadDto>(
      this.authClient.send({ cmd: 'validate_token' }, token),
    );

    if (!payload) throw new UnauthorizedException('Invalid token');
    return payload;
  }
}
