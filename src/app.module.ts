import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NoticeModule } from './notice/notice.module';
import { PetModule } from './pet/pet.module';
import { CategoryModule } from './category/category.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [AuthModule, UserModule, NoticeModule, PetModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
