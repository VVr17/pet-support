import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Notice } from 'src/notices/entities/notices.entity';
import { Category } from 'src/categories/entities/categories.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      // attributes: ['email', 'password', 'id', 'name', 'isAdmin'],
    });
  }

  async findById(id: string) {
    return await this.usersRepository.findByPk(id);
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    return await this.usersRepository.update(updateUserDto, {
      where: { id },
    });
  }

  async remove(id: string) {
    await this.usersRepository.destroy({
      where: { id },
    });

    return {
      message: 'User profile has been successfully deleted',
    };
  }

  async getUserNotices(id: string) {
    const userData = await this.usersRepository.findByPk(id, {
      include: [
        {
          model: Notice,
          as: 'UserNotices',
          include: [
            {
              model: Category,
              attributes: { exclude: ['updatedAt', 'createdAt', 'slug', 'id'] },
            },
          ],
          attributes: {
            exclude: ['ownerId', 'createdAt', 'updatedAt', 'categoryId'],
          },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return {
      message: 'Success',
      data: userData.UserNotices,
    };
  }

  async getUserFavoriteNotices(id: string) {
    return ` get favorite with id ${id}`;
  }

  async addToFavorites(userId: string, noticeId: string) {
    return ` add to favorite ${userId} ${noticeId}`;
  }

  async removeFromFavorites(userId: string, noticeId: string) {
    return `remove from favorite ${userId} ${noticeId}`;
  }

  async getUserPets(id: string) {
    return ` get user's pets with id ${id}`;
  }
}
