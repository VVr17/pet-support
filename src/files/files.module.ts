import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
// import { FirebaseAdminModule } from 'src/config/firebase/firebase-admin.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  // imports: [FirebaseAdminModule],
})
export class FilesModule {}
