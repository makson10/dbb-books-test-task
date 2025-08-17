import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException('Authorization header is missing');

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) throw new UnauthorizedException('Token is missing or invalid');

    const payload = this.authService.validateToken(token);
    if (!payload) throw new UnauthorizedException('Invalid token');

    request.user = payload;
    request.token = token;
    return true;
  }
}
