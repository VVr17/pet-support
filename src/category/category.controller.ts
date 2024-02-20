import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

// import { AdminGuard } from '../auth/guards/admin.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Category') // Swagger tags for API
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiCreatedResponse({
    description: 'Category has been successfully created',
    type: Category,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post()
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory =
      await this.categoryService.create(createCategoryDto);
    return {
      message: 'Category has been successfully created',
      data: createdCategory,
    };
  }

  @ApiOkResponse({ type: [Category] })
  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.findAll();
    return { message: 'Success', data: categories };
  }

  @ApiOkResponse({
    description: 'The category has been successfully found.',
    type: Category,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Get(':id')
  async GetCategoryById(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {
      message: 'The category has been successfully found.',
      data: category,
    };
  }
}
