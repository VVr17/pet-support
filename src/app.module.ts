import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FilesModule } from './files/files.module';
import { NoticeModule } from './notices/notices.module';
import { PetModule } from './pets/pets.module';
import { SpeciesModule } from './species/species.module';
import { UserModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UserModule,
    NoticeModule,
    PetModule,
    CategoryModule,
    SpeciesModule,
    FavoritesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
