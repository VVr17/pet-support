import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoriesRepository.create(createCategoryDto);
    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findByPk(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }
}
