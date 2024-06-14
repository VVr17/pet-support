import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
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

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'FavoriteBy' })
  user: User;

  @ForeignKey(() => Notice)
  @Column({
    type: DataType.UUID,
  })
  noticeId: string;

  @BelongsTo(() => Notice, { foreignKey: 'noticeId', as: 'FavoriteNotice' })
  notice: Notice;
}
