import { Species } from './entities/species.entity';

export const speciesProviders = [
  {
    provide: 'SPECIES_REPOSITORY',
    useValue: Species,
  },
];
