import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { noticesProviders } from './notice.providers';
import { usersProviders } from '../user/user.providers';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService, ...noticesProviders, ...usersProviders],
})
export class NoticeModule {}
