import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  Matches,
  MinLength,
  IsOptional,
  MaxLength,
  IsUrl,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CreateNoticeDto {
  @ApiProperty({ example: 'My Notice Title' }) // Defines properties for CreateUserDto schema in Swagger
  @IsString()
  @MinLength(2)
  @MaxLength(48)
  title: string;

  @ApiProperty({ example: 'Sunny' })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/)
  name: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  photoURL: string;

  @ApiProperty({ example: 'Shepherd' })
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/)
  breed: string;

  @ApiProperty({ enum: ['male', 'female'], example: 'female' })
  @IsEnum(['male', 'female'])
  sex: 'male' | 'female';

  @ApiProperty({ required: false, example: '2021-11-20T00:00:00Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({ example: 'Kyiv, Ukraine' })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
  )
  location: string;

  @ApiProperty({ example: 'This is my comments' })
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  @IsNotEmpty()
  comments: string;

  @ApiProperty({ required: false, example: 100 })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ example: '7cab61c5-0b8f-4eac-8b1c-d6e5290a2170' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
