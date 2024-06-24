import { Injectable } from '@nestjs/common';
import { bucket } from 'src/config/firebase/firebase.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype },
      public: true,
    });

    return fileUpload.publicUrl();
  }

}
