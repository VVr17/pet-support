import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSpeciesDto {
  @ApiProperty({ example: 'Кіт' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  titleUk: string;

  @ApiProperty({ example: 'Cat' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  titleEn: string;

  @ApiProperty({ example: 'cat' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Invalid slug format. Use only lowercase letters, numbers, and hyphens.',
  })
  slug: string;
}
