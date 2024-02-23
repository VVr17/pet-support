import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FAVORITE_NOTICES_REPOSITORY')
    private readonly favoritesRepository: typeof Favorites,
  ) {}

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
