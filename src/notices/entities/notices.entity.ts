import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../../categories/entities/categories.entity';
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

  @Column({
    allowNull: false,
    validate: {
      notNull: { msg: 'Birth date is required' },
    },
  })
  birthDate: string;

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

  @BelongsTo(() => User)
  owner: User;
}
