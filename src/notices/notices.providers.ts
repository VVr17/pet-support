import { Notice } from './entities/notices.entity';

export const noticesProviders = [
  {
    provide: 'NOTICES_REPOSITORY',
    useValue: Notice,
  },
];
