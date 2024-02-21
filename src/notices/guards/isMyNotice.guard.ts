import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Guard to check whether notice to be dealt with belongs to current user
@Injectable()
export class IsMyNoticeGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    console.log(id);
    // const { notices } = request.user;

    // TODO: add
    // return notices.includes(id);
    return true;
  }
}
