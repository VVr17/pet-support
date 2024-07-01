import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Notice } from '../../notices/entities/notices.entity';

@Table({ tableName: 'Species' })
export class Species extends Model<Species> {
  @ApiProperty({ example: '4c9984d8-cf25-4f2a-9177-b3fcfb6bbbcb' })
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty({ example: 'Lost/Found' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Title must be between 3 and 30 characters long',
      },
      notEmpty: {
        msg: 'Title is required',
      },
    },
  })
  titleUk: string;

  @ApiProperty({ example: 'Загублені/Знайдені' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Title must be between 3 and 30 characters long',
      },
      notEmpty: {
        msg: 'Title is required',
      },
    },
  })
  titleEn: string;

  @ApiProperty({ example: 'lost-found' })
  @Column({
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 100],
        msg: 'Slug must be between 3 and 100 characters long',
      },
      is: {
        args: /^[a-z0-9-]+$/,
        msg: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens.',
      },
      notEmpty: {
        msg: 'Slug is required',
      },
    },
  })
  slug: string;

  @HasMany(() => Notice)
  notices: Notice[];
}
