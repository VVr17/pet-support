/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { bucket } from 'src/config/firebase/firebase.config';
import { v4 as uuidv4 } from 'uuid';
import * as admin from 'firebase-admin';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    console.log('fileUpload - from firebase', fileUpload);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    console.log('blobStream', blobStream);
    return new Promise((resolve, reject) => {
      blobStream.on('error', error => reject(error));
      blobStream.on('finish', () => {
        fileUpload
          .getSignedUrl({
            action: 'read',
            expires: '03-09-2491', // Set the expiration date far in the future
          })
          .then(signedUrls => {
            resolve(signedUrls[0]);
          });
      });
      blobStream.end(file.buffer);
    });
  }

  // constructor(
  //   @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  // ) {}

  // async uploadFile(file: Express.Multer.File): Promise<string> {
  //   const bucket = this.firebaseAdmin.storage().bucket();
  //   const fileName = `uploads/${Date.now()}-${file.originalname}`;
  //   const fileUpload = bucket.file(fileName);

  //   await fileUpload.save(file.buffer, {
  //     metadata: { contentType: file.mimetype },
  //     public: true,
  //   });

  //   const url = fileUpload.publicUrl();
  //   return url;
  // }
}
