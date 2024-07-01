import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

import { Category } from 'src/categories/entities/categories.entity';
import { Favorites } from 'src/favorites/entities/favorites.entity';
import { Notice } from 'src/notices/entities/notices.entity';
import { Pet } from 'src/pets/entities/pets.entity';
import { Species } from 'src/species/entities/species.entity';
import { User } from 'src/users/entities/users.entity';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        database: process.env.PGDATABASE,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });

      sequelize.addModels([User, Notice, Pet, Category, Favorites, Species]);
      await sequelize.sync({ alter: true }); // Creates a table if it doesn't exist and adds what was changed
      return sequelize;
    },
  },
];
