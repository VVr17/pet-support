import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Notice } from './entities/notice.entity';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class NoticeService {
  constructor(
    @Inject('NOTICES_REPOSITORY')
    private noticesRepository: typeof Notice,
  ) {}

  async create(createNoticeDto: CreateNoticeDto, userId: string) {
    console.log('userId', userId);
    const newNotice = await this.noticesRepository.create(createNoticeDto);
    return newNotice;
  }

  // Promise<{ notices: Notice[]; total: number }>
  async findAll(category: string | null, page: number, limit: number) {
    console.log(category, page, limit);
    const notices = await this.noticesRepository.findAll({
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
    return notices;
  }

  async findOne(id: string): Promise<Notice> {
    return await this.noticesRepository.findByPk(id, {
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
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    const noticeToUpdate = await this.noticesRepository.findByPk(id);

    if (!noticeToUpdate) {
      throw new NotFoundException('Notice not found');
    }

    await noticeToUpdate.update(updateNoticeDto);

    return noticeToUpdate;
  }

  async removeOne(noticeId: string, userId: string) {
    console.log('userId', userId);
    const noticeToDelete = await this.noticesRepository.findByPk(noticeId);

    if (!noticeToDelete) {
      throw new NotFoundException(`Notice with ID ${noticeId} not found`);
    }

    return await this.noticesRepository.destroy({
      where: { id: noticeId },
    });
  }

  async removeMany(noticeIds: string[]): Promise<void> {
    console.log(noticeIds);
    // await this.noticesRepository.destroy({ where });
  }
}
