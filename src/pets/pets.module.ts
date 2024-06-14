import { Module } from '@nestjs/common';

import { PetsController } from './pets.controller';
import { petsProviders } from './pets.providers';
import { PetsService } from './pets.service';
import { usersProviders } from 'src/users/users.providers';

@Module({
  controllers: [PetsController],
  providers: [PetsService, ...petsProviders, ...usersProviders],
})
export class PetModule {}
