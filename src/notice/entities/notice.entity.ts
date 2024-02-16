import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Notices' })
export class Notice extends Model<Notice> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  title: string;

  @Column
  owner: string;

  @Column
  photoURL: string;

  @Column
  name: string;

  @Column
  breed: string;

  @Column(DataType.ENUM('male', 'female'))
  sex: string;

  @Column
  birthDate: string;

  @Column
  location: string;

  @Column
  comments: string;

  @Column(DataType.INTEGER)
  price: number;

  @Column
  categoryId: string;
}
