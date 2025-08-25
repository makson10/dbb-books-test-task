import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException('Authorization header is missing');

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) throw new UnauthorizedException('Token is missing or invalid');

    request['token'] = token;
    return true;
  }
}
