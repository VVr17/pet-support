import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Species } from './entities/species.entity';
import { SpeciesService } from './species.service';

@ApiTags('Species') // Swagger tags for API
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  // Add new species - guard for Admin only
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiCreatedResponse({
    description: 'Species has been successfully created',
    type: Species,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post()
  async addSpecies(@Body() createSpeciesDto: CreateSpeciesDto) {
    return await this.speciesService.create(createSpeciesDto);
  }

  // Get all species
  @ApiOkResponse({ type: [Species] })
  @Get()
  async findAllSpecies() {
    return await this.speciesService.findAll();
  }

  // Get species by Id
  @ApiOkResponse({
    description: 'The species has been successfully found.',
    type: Species,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Get(':id')
  async findSpeciesById(@Param('id') id: string) {
    return await this.speciesService.findOne(id);
  }
}
