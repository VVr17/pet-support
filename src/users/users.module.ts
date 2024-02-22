import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/db/database.module';
import { usersProviders } from './users.providers';
import { NoticesService } from 'src/notices/notices.service';
import { noticesProviders } from 'src/notices/notices.providers';
import { PetsService } from 'src/pets/pets.service';
import { petsProviders } from 'src/pets/pets.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    NoticesService,
    PetsService,
    ...usersProviders,
    ...noticesProviders,
    ...petsProviders,
  ],
  exports: [UsersService],
})
export class UserModule {}
