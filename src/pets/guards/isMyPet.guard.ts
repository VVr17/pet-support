import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PetsService } from '../pets.service';

// Guard to check whether pet to be dealt with belongs to current user
@Injectable()
export class IsMyPetGuard implements CanActivate {
  constructor(private readonly petsService: PetsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    const response = await this.petsService.findPetsByUserId(request.user.id);
    const ownPetsIds = response.data.map(pet => pet.id);

    return ownPetsIds.includes(id);
  }
}
