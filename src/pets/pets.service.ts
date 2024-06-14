import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entities/pets.entity';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @Inject('PETS_REPOSITORY')
    private petsRepository: typeof Pet,
  ) {}

  async create(createPetDto: CreatePetDto, userId: string) {
    const newPet = await this.petsRepository.create({
      ...createPetDto,
      ownerId: userId,
    });

    return {
      message: 'New pet successfully created',
      data: newPet.dataValues,
    };
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const petToUpdate = await this.petsRepository.findByPk(id);

    if (!petToUpdate) {
      throw new NotFoundException('Pet has not been found');
    }

    const updatedPet = await petToUpdate.update(updatePetDto);

    return {
      message: 'Pet has been successfully updated',
      data: updatedPet,
    };
  }

  async removeOne(id: string) {
    const petToDelete = await this.petsRepository.findByPk(id);

    if (!petToDelete) {
      throw new NotFoundException(`Pet with Id ${id} not found`);
    }

    await this.petsRepository.destroy({ where: { id } });

    return { message: `Pet ${id} has been deleted successfully` };
  }

  async findPetsByUserId(id: string) {
    const pets = await this.petsRepository.findAll({
      where: { ownerId: id },
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'ownerId'],
      },
    });

    return {
      message: 'Success',
      data: pets,
    };
  }
}
