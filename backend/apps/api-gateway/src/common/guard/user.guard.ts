import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Injectable()
export class UserGuard {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  async canActivate(ctx: any): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const user = await lastValueFrom(
      this.authClient.send({ cmd: 'validate_token' }, request.token),
    );

    if (!user) throw new Error('Unauthorized access');

    request['user'] = user;
    return true;
  }
}
