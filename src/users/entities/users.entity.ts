import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  BelongsToMany,
  BeforeCreate,
} from 'sequelize-typescript';

import { Favorites } from '../../favorites/entities/favorites.entity';
import { Notice } from '../../notices/entities/notices.entity';
import { Pet } from '../../pets/entities/pets.entity';

@Table({ tableName: 'Users', paranoid: true })
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty({ example: 'email@gmail.com' })
  @Column({ unique: true, allowNull: false, validate: { isEmail: true } })
  email: string;

  @ApiProperty({ example: 'Password1' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [7, undefined],
        msg: 'Password must be at least 7 characters long',
      },
      is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
    },
  })
  password: string;

  @ApiProperty({ example: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin: boolean;

  @ApiProperty({ example: 'John Smith', required: false })
  @Column({
    allowNull: true,
    validate: {
      len: {
        args: [3, 32],
        msg: 'Name must be between 3 and 32 characters long',
      },
      is: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
    },
  })
  fullName: string;

  @ApiProperty({ example: '20.11.1990', required: false })
  @Column({ allowNull: true })
  birthday: string;

  @ApiProperty({ example: 'Kyiv, Ukraine', required: false })
  @Column({
    allowNull: true,
    validate: {
      len: {
        args: [5, 100],
        msg: 'Location must be between 5 and 100 characters long',
      },
      is: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
    },
  })
  address: string;

  @ApiProperty({ example: '+380991234567', required: false })
  @Column({
    allowNull: true,
    validate: {
      is: /^\+380\d{9}$/,
    },
  })
  phone: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
    required: false,
  })
  @Column({
    allowNull: true,
    validate: {
      isUrl: { msg: 'Please enter a valid URL for the photo' },
    },
  })
  photoURL: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  emailVerified: boolean;

  @Column({ allowNull: true })
  resetPasswordToken: string;

  // One-to-many User -> Pets
  @HasMany(() => Pet)
  UserPets: Pet[];

  // One-to-many User -> Notices
  @HasMany(() => Notice, { as: 'UserNotices' })
  UserNotices: Notice[];

  // Many-to-Many User <-> Notice
  @BelongsToMany(() => Notice, {
    through: () => Favorites,
    foreignKey: 'userId',
    as: 'FavoriteNotices',
  })
  UserFavorites: Notice[];

  // Hash the password before storing it in the database
  @BeforeCreate
  static async hashPassword(user: User) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
}
