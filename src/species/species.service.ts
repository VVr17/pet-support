import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @Inject('SPECIES_REPOSITORY')
    private speciesRepository: typeof Species,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto) {
    const species = await this.speciesRepository.create(createSpeciesDto);

    return {
      message: 'species has been successfully created',
      data: species,
    };
  }

  async findAll() {
    const allSpecies = await this.speciesRepository.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return { message: 'Success', data: allSpecies };
  }

  async findOne(id: string) {
    const species = await this.speciesRepository.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!species) {
      throw new NotFoundException(`species with ID ${id} not found`);
    }

    return {
      message: 'The species has been successfully found.',
      data: species,
    };
  }
}
