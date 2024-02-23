import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { noticesProviders } from './notices.providers';
import { favoriteNoticesProviders } from '../favorites/favorites.providers';

@Module({
  controllers: [NoticesController],
  providers: [NoticesService, ...noticesProviders, ...favoriteNoticesProviders],
})
export class NoticeModule {}
