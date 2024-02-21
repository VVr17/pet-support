import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { noticesProviders } from './notices.providers';
import { usersProviders } from '../users/users.providers';

@Module({
  controllers: [NoticesController],
  providers: [NoticesService, ...noticesProviders, ...usersProviders],
})
export class NoticeModule {}
