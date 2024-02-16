import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

import { Category } from 'src/category/entities/category.entity';
import { Notice } from 'src/notice/entities/notice.entity';
import { User } from 'src/user/entities/user.entity';
import { Pet } from 'src/pet/entities/pet.entity';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: 5432,
        database: process.env.DATABASE_DB,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
      });

      sequelize.addModels([User, Notice, Pet, Category]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
