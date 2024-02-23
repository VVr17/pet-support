import { Favorites } from './entities/favorites.entity';

export const favoriteNoticesProviders = [
  {
    provide: 'FAVORITE_NOTICES_REPOSITORY',
    useValue: Favorites,
  },
];
