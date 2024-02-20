import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { petsProviders } from './pet.providers';
import { usersProviders } from 'src/user/user.providers';

@Module({
  controllers: [PetController],
  providers: [PetService, ...petsProviders, ...usersProviders],
})
export class PetModule {}
