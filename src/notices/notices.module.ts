import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { noticesProviders } from './notices.providers';

@Module({
  controllers: [NoticesController],
  providers: [NoticesService, ...noticesProviders],
})
export class NoticeModule {}
