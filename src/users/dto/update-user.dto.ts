import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: 'Please provide a valid email location' })
  email: string;

  @ApiProperty({ required: false, example: 'John Smith' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(32, { message: 'Name cannot exceed 32 characters' })
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/, {
    message: 'Name must contain only letters and spaces',
  })
  fullName?: string;

  @ApiProperty({ required: false, example: '1990-11-20T00:00:00Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @ApiProperty({ example: 'Kyiv, Ukraine' })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'location must be at least 5 characters long' })
  @MaxLength(100, { message: 'location cannot exceed 100 characters' })
  @Matches(
    /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
    {
      message: 'Invalid location format. Please provide a valid location',
    },
  )
  location?: string;

  @ApiProperty({ required: false, example: '+380991234567' })
  @IsOptional()
  @IsString()
  @Matches(/^\+380\d{9}$/, {
    message: 'Please provide a valid phone number in the format +380XXXXXXXXX',
  })
  phone?: string;

  @ApiProperty({
    required: false,
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @IsOptional()
  @IsString()
  photoURL?: string;
}
