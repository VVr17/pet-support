import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { NoticesService } from '../notices.service';

// Guard to check whether notice to be dealt with belongs to current user
@Injectable()
export class IsMyNoticeGuard implements CanActivate {
  constructor(private readonly noticesService: NoticesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    const response = await this.noticesService.findNoticesByUserId(
      request.user.id,
    );
    const ownNoticeIds = response.data.map(notice => notice.id);

    return ownNoticeIds.includes(id);
  }
}
