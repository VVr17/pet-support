import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return await this.usersRepository.findByPk(id, {
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt',
          'password',
          'resetPasswordToken',
          'deletedAt',
        ],
      },
    });
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    await this.usersRepository.update(updateUserDto, {
      where: { id },
    });

    return { message: 'User profile has been successfully updated' };
  }

  async remove(id: string) {
    await this.usersRepository.destroy({
      where: { id },
    });

    return {
      message: 'User profile has been successfully deleted',
    };
  }

  async findUserFavoriteNotices(id: string) {
    return {
      message: 'Success',
      data: ` get favorite with id ${id}`,
    };
  }

  async addToFavorites(userId: string, noticeId: string) {
    return {
      message: `Notice ${noticeId} added to favorites for user ${userId}`, // req.user._id
      data: ` add to favorite ${userId} ${noticeId}`,
    };
  }

  async removeFromFavorites(userId: string, noticeId: string) {
    return {
      message: `Notice ${noticeId} removed from favorites for user ${userId}`, // req.user._id
      data: `remove from favorite ${userId} ${noticeId}`,
    };
  }
}
