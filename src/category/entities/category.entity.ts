import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Categories' })
export class Category extends Model<Category> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  titleUk: string;

  @Column
  titleEn: string;

  @Column
  slug: string;
}
