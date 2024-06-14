import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ required: false, example: 'John Smith' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(32, { message: 'Name cannot exceed 32 characters' })
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/, {
    message: 'Name must contain only letters and spaces',
  })
  name?: string;

  @ApiProperty({ required: false, example: '20.11.1990' })
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiProperty({ example: 'Kyiv, Ukraine' })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'City must be at least 5 characters long' })
  @MaxLength(100, { message: 'City cannot exceed 100 characters' })
  @Matches(
    /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
    {
      message: 'Invalid city format. Please provide a valid city name',
    },
  )
  city?: string;

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
