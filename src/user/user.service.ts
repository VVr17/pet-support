import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    return newUser;
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
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
    return await this.usersRepository.destroy({
      where: { id },
    });
  }

  async getUserNotices(id: string) {
    return `get notice with id ${id}`;
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
