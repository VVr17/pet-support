import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column(DataType.ARRAY(DataType.UUID))
  pets: string[];

  @Column(DataType.ARRAY(DataType.UUID))
  notices: string[];

  @Column(DataType.ARRAY(DataType.UUID))
  favoriteNotices: string[];

  @Column(DataType.BOOLEAN)
  emailVerified: boolean;

  @Column
  resetPasswordToken: string;
}
