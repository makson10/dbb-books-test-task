import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/common/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return { id: payload.sub, name: payload.name, role: payload.role };
    } catch {
      return null;
    }
  }
}
