import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { petsProviders } from './pet.providers';

@Module({
  controllers: [PetController],
  providers: [PetService, ...petsProviders],
})
export class PetModule {}
