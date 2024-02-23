import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Notice } from '../../notices/entities/notices.entity';
import { User } from 'src/users/entities/users.entity';

@Table({ tableName: 'Favorites', createdAt: false, updatedAt: false })
export class Favorites extends Model<Favorites> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @ForeignKey(() => Notice)
  @Column({
    type: DataType.UUID,
  })
  noticeId: string;
}
