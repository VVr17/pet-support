import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

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

  // One-to-many: Category -> Notice
  @ForeignKey(() => Category)
  @Column({ field: 'Category_id', type: DataType.UUID })
  categoryId: string;

  @BelongsTo(() => Category, { foreignKey: 'categoryId' })
  category: Category;

  // One-to-many: User -> Notice
  @ForeignKey(() => User)
  @Column({ field: 'Owner_id', type: DataType.UUID })
  ownerId: string;

  @BelongsTo(() => User)
  owner: User;
}
