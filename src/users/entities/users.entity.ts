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

  @Column({ unique: true, allowNull: false, validate: { isEmail: true } })
  email: string;

  @Column
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
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

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  emailVerified: boolean;

  @Column
  resetPasswordToken: string;

  @HasMany(() => Pet)
  UserPets: Pet[];

  @HasMany(() => Notice, { as: 'UserNotices' })
  UserNotices: Notice[];

  @BelongsToMany(() => Notice, {
    through: 'Favorites',
    foreignKey: 'noticeId',
    otherKey: 'userId',
    as: 'User',
  })
  favoriteNotices: Notice[];

  // Hash the password before storing it in the database
  @BeforeCreate
  static async hashPassword(user: User) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
}
