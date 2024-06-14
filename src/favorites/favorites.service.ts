import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from 'src/categories/entities/categories.entity';
import { Favorites } from './entities/favorites.entity';
import { Notice } from 'src/notices/entities/notices.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FAVORITE_NOTICES_REPOSITORY')
    private readonly favoritesRepository: typeof Favorites,
  ) {}

  async findFavoriteByUserId(id: string) {
    const favoritesWithNoticeData = await this.favoritesRepository.findAll({
      where: { userId: id },
      include: [
        {
          model: Notice,
          as: 'FavoriteNotice',
          attributes: {
            exclude: ['updatedAt', 'createdAt', 'ownerId', 'categoryId'],
          },
          include: [
            {
              model: Category,
              attributes: {
                exclude: ['updatedAt', 'createdAt', 'slug'],
              },
            },
            {
              model: User,
              as: 'Owner',
              attributes: ['email', 'phone'],
            },
          ],
        },
      ],
    });

    const favorites = favoritesWithNoticeData.map(
      notice =>
        (notice as unknown as { FavoriteNotice: Notice[] }).FavoriteNotice,
    );

    return {
      message: 'Success',
      data: favorites,
    };
  }

  async addToFavorites(userId: string, noticeId: string) {
    await this.favoritesRepository.create({
      userId,
      noticeId,
    });

    return {
      message: `Notice ${noticeId} added to favorites`,
    };
  }

  async removeFromFavorites(userId: string, noticeId: string) {
    const result = await this.favoritesRepository.destroy({
      where: {
        userId,
        noticeId,
      },
    });

    if (!result) {
      throw new NotFoundException(`No favorites found with id ${noticeId}`);
    }

    return { message: `Notice ${noticeId} removed from favorites` };
  }
}
