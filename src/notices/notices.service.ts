/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';

import { Category } from 'src/categories/entities/categories.entity';
import { Species } from 'src/species/entities/species.entity';
import { User } from 'src/users/entities/users.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notices.entity';

@Injectable()
export class NoticesService {
  constructor(
    @Inject('NOTICES_REPOSITORY')
    private noticesRepository: typeof Notice,
  ) {}

  async create(createNoticeDto: CreateNoticeDto, userId: string) {
    const newNotice = await this.noticesRepository.create({
      ...createNoticeDto,
      ownerId: userId,
    });

    return {
      message: 'New notice successfully created',
      data: newNotice.dataValues,
    };
  }

  async findAll({
    page,
    limit,
    sort,
    sortType,
    categoryId,
    speciesId,
    sex,
    priceMin,
    priceMax,
  }: {
    page: number;
    limit: number;
    sort: string;
    sortType: 'ASC' | 'DESC';
    categoryId: string | null;
    speciesId: string;
    sex: 'male' | 'female' | null;
    priceMin: number;
    priceMax: number;
  }) {
    // Category filter
    const whereClause: any = categoryId ? { categoryId } : {};

    // Sex filter
    if (sex) {
      whereClause.sex = sex;
    }

    // Species filter
    if (speciesId) {
      whereClause.speciesId = speciesId;
    }

    // Price filter
    if (priceMin && priceMax) {
      whereClause.price = {
        [Op.between]: [priceMin, priceMax],
      };
    } else if (priceMin) {
      whereClause.price = {
        [Op.gte]: priceMin,
      };
    } else if (priceMax) {
      whereClause.price = {
        [Op.lte]: priceMax,
      };
    }

    // Find total count of notices
    const total = await this.noticesRepository.count({ where: whereClause });

    // Find notices with associations
    const notices = await this.noticesRepository.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'Owner',
          attributes: ['email', 'phone'],
        },
        {
          model: Category,
          attributes: { exclude: ['updatedAt', 'createdAt', 'slug'] },
        },
        {
          model: Species,
          attributes: { exclude: ['updatedAt', 'createdAt', 'slug'] },
        },
      ],
      attributes: {
        exclude: ['updatedAt', 'ownerId', 'categoryId'],
      },
      order: [[sort, sortType]],
      offset: (page - 1) * limit, // Calculate offset based on page number
      limit: limit, // Set limit to the specified limit
    });

    return {
      message: 'Success',
      total,
      data: notices,
    };
  }

  async findById(id: string) {
    const notice = await this.noticesRepository.findByPk(id, {
      include: [
        {
          model: User,
          as: 'Owner',
          attributes: ['email', 'phone'],
        },
        {
          model: Category,
          attributes: {
            exclude: ['updatedAt', 'createdAt', 'slug'],
          },
        },
        {
          model: Species,
          attributes: { exclude: ['updatedAt', 'createdAt', 'slug'] },
        },
      ],
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'ownerId', 'categoryId'], // Exclude unnecessary fields from Notice
      },
    });

    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }

    return { message: 'Notice has been successfully found', data: notice };
  }

  async findNoticesByUserId(id: string) {
    const notices = await this.noticesRepository.findAll({
      where: { ownerId: id },
      include: [
        {
          model: Category,
          attributes: {
            exclude: ['updatedAt', 'createdAt', 'slug'],
          },
        },
      ],
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'ownerId', 'categoryId'], // Exclude unnecessary fields from Notice
      },
    });

    return {
      message: 'Success',
      data: notices,
    };
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const noticeToUpdate = await this.noticesRepository.findByPk(id);

    if (!noticeToUpdate) {
      throw new NotFoundException('Notice not found');
    }

    const updatedNotice = await noticeToUpdate.update(updateNoticeDto);

    return {
      message: 'Notice has been successfully updated',
      data: updatedNotice,
    };
  }

  async removeOne(id: string) {
    const noticeToDelete = await this.noticesRepository.findByPk(id);

    if (!noticeToDelete) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }

    await this.noticesRepository.destroy({ where: { id } });

    return { message: `Notice ${id} has been deleted successfully` };
  }
}
