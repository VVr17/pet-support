import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  ownerId: string;

  @Column
  birthDate: string;

  @Column
  breed: string;

  @Column
  comments: string;

  @Column
  photoURL: string;
}
