import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './entities/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesRepository.create(createCategoryDto);

    return {
      message: 'Category has been successfully created',
      data: category,
    };
  }

  async findAll() {
    const categories = await this.categoriesRepository.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return { message: 'Success', data: categories };
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return {
      message: 'The category has been successfully found.',
      data: category,
    };
  }
}
