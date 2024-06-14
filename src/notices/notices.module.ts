import { Module } from '@nestjs/common';

import { favoriteNoticesProviders } from '../favorites/favorites.providers';
import { noticesProviders } from './notices.providers';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

@Module({
  controllers: [NoticesController],
  providers: [NoticesService, ...noticesProviders, ...favoriteNoticesProviders],
})
export class NoticeModule {}
