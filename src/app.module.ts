import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import { NoticeModule } from './notices/notices.module';
import { PetModule } from './pets/pets.module';
import { UserModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UserModule,
    NoticeModule,
    PetModule,
    CategoryModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
