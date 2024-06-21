import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';

import { Category } from '../../categories/entities/categories.entity';
import { Favorites } from '../../favorites/entities/favorites.entity';
import { User } from '../../users/entities/users.entity';

@Table({ tableName: 'Notices' })
export class Notice extends Model<Notice> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty({ example: 'My Notice Title' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [2, 48],
        msg: 'Title must be between 2 and 48 characters long',
      },
      notNull: { msg: 'Title is required' },
    },
  })
  title: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @Column({
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'Please enter a valid URL for photo',
      },
      notNull: {
        msg: 'Photo URL is required',
      },
    },
  })
  photoURL: string;

  @ApiProperty({ example: 'Sunny' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [2, 16],
        msg: 'Name must be between 2 and 16 characters long',
      },
      is: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      notNull: { msg: 'Name is required' },
    },
  })
  name: string;

  @ApiProperty({ example: 'Shepherd' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [2, 24],
        msg: 'Breed must be between 2 and 24 characters long',
      },
      is: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      notNull: { msg: 'Breed is required' },
    },
  })
  breed: string;

  @ApiProperty({ enum: ['male', 'female'], example: 'female' })
  @Column({
    allowNull: false,
    type: DataType.ENUM('male', 'female'),
    validate: {
      isIn: {
        args: [['male', 'female']],
        msg: 'Sex must be either "male" or "female"',
      },
      notNull: { msg: 'Sex is required' },
    },
  })
  sex: string;

  @ApiProperty({ example: '1990-11-20T00:00:00Z', required: false })
  @Column({
    allowNull: false,
    validate: {
      notNull: { msg: 'Birth date is required' },
    },
  })
  dateOfBirth: Date;

  @ApiProperty({ example: 'Kyiv, Ukraine' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [5, 100],
        msg: 'Location must be between 5 and 100 characters long',
      },
      is: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
      notNull: { msg: 'Location is required' },
    },
  })
  location: string;

  @ApiProperty({ example: 'This is my comments' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [8, 200],
        msg: 'Comments must be between 8 and 200 characters long',
      },
      notNull: { msg: 'Comments are required' },
    },
  })
  comments: string;

  @ApiProperty({ required: false, example: 100 })
  @Column({
    allowNull: true,
    validate: { isInt: { msg: 'Price must be an integer' } },
  })
  price: number;

  // One-to-many: Category -> Notice
  @ForeignKey(() => Category)
  @Column({ field: 'Category_id', type: DataType.UUID, allowNull: false })
  categoryId: string;

  @BelongsTo(() => Category, { foreignKey: 'categoryId' })
  category: Category;

  // One-to-many: User -> Notice
  @ForeignKey(() => User)
  @Column({ field: 'Owner_id', type: DataType.UUID, allowNull: false })
  ownerId: string;

  @BelongsTo(() => User, { foreignKey: 'ownerId', as: 'Owner' })
  owner: User;

  // Many-to-many: User <-> Notice
  @BelongsToMany(() => User, {
    through: () => Favorites,
    foreignKey: 'noticeId',
    as: 'FavoriteBy',
  })
  users: User[];
}
