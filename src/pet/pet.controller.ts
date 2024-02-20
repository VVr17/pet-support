import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  // UseGuards,
  Put,
  // Request,
} from '@nestjs/common';
import {
  // ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';

@ApiTags('Pets') // Swagger tag for API
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('pets')
export class PetController {
  constructor(private readonly petsService: PetService) {}

  @ApiCreatedResponse({
    description: 'The pet has been successfully created.',
    type: Pet,
  })
  @Post()
  create(
    @Body() createPetDto: CreatePetDto,
    // @Request() req: AuthenticatedRequest,
  ) {
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    return this.petsService.create(createPetDto, userId); // req.user._id
  }

  @ApiOkResponse({
    description: 'The pet has been successfully updated.',
    type: Pet,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  // @UseGuards(IsMyPetGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @ApiOkResponse({
    description: 'The pet has been successfully removed.',
    type: Pet,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  // @UseGuards(IsMyPetGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    // @Request() req: AuthenticatedRequest
  ) {
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    await this.petsService.removeOne(id, userId); // req.user._id

    return { message: `Pet ${id} has been deleted successfully` };
  }
}
