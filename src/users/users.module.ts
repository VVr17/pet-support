import { Module } from '@nestjs/common';

import { favoriteNoticesProviders } from 'src/favorites/favorites.providers';
import { FavoritesService } from 'src/favorites/favorites.service';
import { DatabaseModule } from 'src/config/db/database.module';
import { noticesProviders } from 'src/notices/notices.providers';
import { NoticesService } from 'src/notices/notices.service';
import { petsProviders } from 'src/pets/pets.providers';
import { PetsService } from 'src/pets/pets.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    NoticesService,
    PetsService,
    FavoritesService,
    ...usersProviders,
    ...noticesProviders,
    ...petsProviders,
    ...favoriteNoticesProviders,
  ],
  exports: [UsersService],
})
export class UserModule {}
