import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Notice } from '../../notice/entities/notice.entity';
import { Pet } from '../../pet/entities/pet.entity';

@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column
  password: string;

  @Column(DataType.BOOLEAN)
  isAdmin: boolean;

  @Column
  name: string;

  @Column
  birthday: string;

  @Column
  city: string;

  @Column
  phone: string;

  @Column
  photoURL: string;

  @Column(DataType.BOOLEAN)
  emailVerified: boolean;

  @Column
  resetPasswordToken: string;

  @HasMany(() => Pet)
  pets: Pet[];

  @HasMany(() => Notice)
  notices: Notice[];

  @BelongsToMany(() => Notice, {
    through: 'Liked',
    foreignKey: 'noticeId',
    otherKey: 'userId',
    as: 'User',
  })
  likedNotices: Notice[];
}
