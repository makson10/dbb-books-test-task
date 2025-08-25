import { Body, Controller, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @MessagePattern({ cmd: 'generate_token' })
  generateToken(@Body() user: User): string {
    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  @MessagePattern({ cmd: 'validate_token' })
  validateToken(@Body() token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return { id: payload.sub, name: payload.name, role: payload.role };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
