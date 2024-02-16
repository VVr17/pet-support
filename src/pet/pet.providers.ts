import { Pet } from './entities/pet.entity';

export const petsProviders = [
  {
    provide: 'PETS_REPOSITORY',
    useValue: Pet,
  },
];
