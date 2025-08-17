import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard {
  canActivate(ctx: any): boolean {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader)
      throw new BadRequestException('Authorization header is missing');

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) throw new BadRequestException('Token is missing or invalid');

    request['token'] = token;
    return true;
  }
}
