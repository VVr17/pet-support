import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Guard to check whether pet to be dealt with belongs to current user
@Injectable()
export class IsMyPetGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    console.log(id);
    // const { pets } = request.user;

    // TODO: Add
    // return pets.includes(id);
    return true;
  }
}
