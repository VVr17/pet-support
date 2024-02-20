import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'Pets' })
export class Pet extends Model<Pet> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  name: string;

  @Column
  birthDate: string;

  @Column
  breed: string;

  @Column
  comments: string;

  @Column
  photoURL: string;

  // One-to-many: User -> Pet
  @ForeignKey(() => User)
  @Column({ field: 'Owner_id', type: DataType.UUID })
  ownerId: string;

  @BelongsTo(() => User)
  owner: User;
}
