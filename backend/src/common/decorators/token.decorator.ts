import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader)
      throw new BadRequestException('Authorization header is missing');

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) throw new BadRequestException('Token is missing or invalid');

    return token;
  },
);
