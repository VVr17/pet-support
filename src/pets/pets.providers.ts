import { Pet } from './entities/pets.entity';

export const petsProviders = [
  {
    provide: 'PETS_REPOSITORY',
    useValue: Pet,
  },
];
