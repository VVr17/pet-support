import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { NoticeModule } from './notices/notices.module';
import { PetModule } from './pets/pets.module';
import { CategoryModule } from './categories/categories.module';
import { FavoritesModule } from './favorites/favorites.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [AuthModule, UserModule, NoticeModule, PetModule, CategoryModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
