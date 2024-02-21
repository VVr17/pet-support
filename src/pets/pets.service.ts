import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './entities/pets.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @Inject('PETS_REPOSITORY')
    private petsRepository: typeof Pet,
  ) {}

  // Promise<Pet>
  async create(createPetDto: CreatePetDto, userId: string): Promise<Pet> {
    console.log('userId', userId);
    const newPet = await this.petsRepository.create(createPetDto);
    return newPet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const petToUpdate = await this.petsRepository.findByPk(id);

    if (!petToUpdate) {
      throw new NotFoundException('Notice not found');
    }

    await petToUpdate.update(updatePetDto);

    return petToUpdate;
  }

  async removeOne(petId: string, userId: string): Promise<void> {
    console.log('userId', userId);
    const petToDelete = await this.petsRepository.findByPk(petId);

    if (!petToDelete) {
      throw new NotFoundException(`Notice with ID ${petId} not found`);
    }

    await this.petsRepository.destroy({
      where: { id: petId },
    });

    return;
  }

  async removeMany(petIds: string[]): Promise<void> {
    console.log(petIds);
    // await this.petsRepository.destroy({ where });
  }
}
