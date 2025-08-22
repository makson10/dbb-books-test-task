import { AuthService } from '@/modules/auth/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard {
  constructor(private authService: AuthService) {}

  canActivate(ctx: any): boolean {
    const request = ctx.switchToHttp().getRequest();
    const user = this.authService.validateToken(request.token);

    if (!user) {
      throw new Error('Unauthorized access');
    }

    request['user'] = user;
    return true;
  }
}
