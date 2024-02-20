import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Загублені/Знайдені' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  titleUk: string;

  @ApiProperty({ example: 'Lost/Found' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  titleEn: string;

  @ApiProperty({ example: 'lost-found' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Invalid slug format. Use only lowercase letters, numbers, and hyphens.',
  })
  slug: string;
}
