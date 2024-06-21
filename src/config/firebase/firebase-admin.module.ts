import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async (configService: ConfigService) => {
        const firebaseConfig = {
          credential: admin.credential.cert({
            projectId: configService.get<string>(
              process.env.FIREBASE_PROJECT_ID,
            ),
            clientEmail: configService.get<string>(
              process.env.FIREBASE_CLIENT_EMAIL,
            ),
            privateKey: configService
              .get<string>(process.env.FIREBASE_PRIVATE_KEY)
              .replace(/\\n/g, '\n'),
          }),
          storageBucket: configService.get<string>(process.env.FIREBASE_BUCKET),
        };
        return admin.initializeApp(firebaseConfig);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}
