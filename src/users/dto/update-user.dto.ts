import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ example: 'Password1' })
  @IsString()
  @MinLength(7, { message: 'Password must be at least 7 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsString()
  isAdmin?: boolean;

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
