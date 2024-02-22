import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Notice } from './entities/notices.entity';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { User } from 'src/users/entities/users.entity';
import { Category } from 'src/categories/entities/categories.entity';

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

  async findAll(categoryId: string | null, page: number, limit: number) {
    const whereClause = categoryId ? { categoryId } : {};

    // Find total count of notices
    const total = await this.noticesRepository.count({ where: whereClause });

    // Find notices with associations
    const notices = await this.noticesRepository.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['email', 'phone'],
        },
        {
          model: Category,
          attributes: { exclude: ['updatedAt', 'createdAt', 'slug'] },
        },
      ],
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'ownerId', 'categoryId'],
      },
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
          attributes: ['email', 'phone'],
        },
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

    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }

    return { message: 'Notice has been successfully found', data: notice };
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
}
