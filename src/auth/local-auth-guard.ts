import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);

    if (canActivate) {
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
    }
    return true;
  }
}
