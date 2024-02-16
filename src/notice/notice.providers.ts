import { Notice } from './entities/notice.entity';

export const noticesProviders = [
  {
    provide: 'NOTICES_REPOSITORY',
    useValue: Notice,
  },
];
