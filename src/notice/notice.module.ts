import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { noticesProviders } from './notice.providers';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService, ...noticesProviders],
})
export class NoticeModule {}
