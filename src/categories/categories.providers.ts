import { Category } from './entities/categories.entity';

export const categoriesProviders = [
  {
    provide: 'CATEGORIES_REPOSITORY',
    useValue: Category,
  },
];
