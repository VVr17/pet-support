import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pets.entity';
import { IsMyPetGuard } from './guards/isMyPet.guard';
import { PetsService } from './pets.service';

@ApiTags('Pets') // Swagger tag for API
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // Get pet by Id
  @ApiOkResponse({
    description: 'The pet has been successfully found.',
    type: Pet,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(IsMyPetGuard)
  @Get(':id')
  async findNoticeById(@Param('id') id: string) {
    return await this.petsService.findById(id);
  }

  // Add new pet
  @ApiCreatedResponse({
    description: 'The pet has been successfully created.',
    type: Pet,
  })
  @Post()
  create(
    @Body() createPetDto: CreatePetDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.petsService.create(createPetDto, req.user.id);
  }

  // Update pet
  @ApiOkResponse({
    description: 'The pet has been successfully updated.',
    type: Pet,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(IsMyPetGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  // Delete pet
  @ApiOkResponse({
    description: 'The pet has been successfully removed.',
    type: Pet,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(IsMyPetGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.petsService.removeOne(id);
  }
}
