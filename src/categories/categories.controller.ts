import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { AdminGuard } from '../auth/guards/admin.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/categories.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Categories') // Swagger tags for API
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiCreatedResponse({
    description: 'Category has been successfully created',
    type: Category,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post()
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @ApiOkResponse({ type: [Category] })
  @Get()
  async findAllCategories() {
    return await this.categoriesService.findAll();
  }

  @ApiOkResponse({
    description: 'The category has been successfully found.',
    type: Category,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Get(':id')
  async findCategoryById(@Param('id') id: string) {
    return await this.categoriesService.findOne(id);
  }
}
