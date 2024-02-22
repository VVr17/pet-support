import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'Pets' })
export class Pet extends Model<Pet> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty({ example: 'Bunny' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [2, 16],
        msg: 'Name must be between 2 and 16 characters long',
      },
      is: {
        args: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
        msg: 'Only letters can be accepted',
      },
      notEmpty: {
        msg: 'Name is required',
      },
    },
  })
  name: string;

  @ApiProperty({ required: false, example: '20.10.2020' })
  @Column({
    allowNull: false,
    validate: {
      notNull: { msg: 'Birth date is required' },
    },
  })
  birthDate?: string;

  @ApiProperty({ required: false, example: 'Shepherd' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [2, 24],
        msg: 'Breed must be between 2 and 24 characters long',
      },
      is: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      notNull: { msg: 'Breed is required' },
    },
  })
  breed?: string;

  @ApiProperty({ required: false, example: 'Good friend' })
  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [8, 200],
        msg: 'Comments must be between 8 and 200 characters long',
      },
      notNull: { msg: 'Comments are required' },
    },
  })
  comments?: string;

  @ApiProperty({
    required: false,
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @Column({
    allowNull: false,
    validate: {
      isUrl: {
        msg: 'Please enter a valid URL for photo',
      },
      notNull: {
        msg: 'Photo URL is required',
      },
      notEmpty: {
        msg: 'Photo URL is required',
      },
    },
  })
  photoURL?: string;

  // One-to-many: User -> Pet
  @ForeignKey(() => User)
  @Column({ field: 'Owner_id', type: DataType.UUID })
  ownerId: string;

  @BelongsTo(() => User)
  owner: User;
}
