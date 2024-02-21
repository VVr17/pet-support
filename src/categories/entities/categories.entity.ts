import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Notice } from '../../notices/entities/notices.entity';

@Table({ tableName: 'Categories' })
export class Category extends Model<Category> {
  @ApiProperty({ example: '4c9984d8-cf25-4f2a-9177-b3fcfb6bbbcb' })
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty({ example: 'Lost/Found' })
  @Column
  titleUk: string;

  @ApiProperty({ example: 'Загублені/Знайдені' })
  @Column
  titleEn: string;

  @ApiProperty({ example: 'lost-found' })
  @Column
  slug: string;

  @HasMany(() => Notice)
  notices: Notice[];
}
