import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { favoriteNoticesProviders } from './favorites.providers';

@Module({
  providers: [FavoritesService, ...favoriteNoticesProviders],
})
export class FavoritesModule {}
