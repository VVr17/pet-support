import { Module } from '@nestjs/common';

import { SpeciesController } from './species.controller';
import { speciesProviders } from './species.providers';
import { SpeciesService } from './species.service';

@Module({
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProviders],
})
export class SpeciesModule {}
