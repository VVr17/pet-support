import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Notice } from 'src/notices/entities/notices.entity';
import { Pet } from 'src/pets/entities/pets.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NoticesService } from 'src/notices/notices.service';
import { PetsService } from 'src/pets/pets.service';

@ApiTags('Users') // Swagger tag for API
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly noticesService: NoticesService,
    private readonly petsService: PetsService,
  ) {}

  // Get current user data
  @ApiOkResponse({ type: User })
  @Get('me')
  async findUser(@Request() req: AuthenticatedRequest) {
    const user = await this.usersService.findById(req.user.id);
    return { data: user };
  }

  // update user data
  @ApiOkResponse({
    type: User,
    description: 'User profile has been successfully updated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Put('me')
  async updateUser(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(updateUserDto, req.user.id);
  }

  // Delete user account
  @ApiOkResponse({ description: 'User profile has been successfully deleted' })
  @Delete('me')
  async removeUser(@Request() req: AuthenticatedRequest) {
    return await this.usersService.remove(req.user.id);
  }

  // Get user's own notices
  @ApiOkResponse({ type: [Notice] })
  @Get('me/notices')
  async findUserNotices(@Request() req: AuthenticatedRequest) {
    return await this.noticesService.findNoticesByUserId(req.user.id);
  }

  // Get user's favorite notices
  @ApiOkResponse({ type: [Notice] })
  @Get('me/favorites')
  async findUserFavorites(@Request() req: AuthenticatedRequest) {
    return await this.usersService.findUserFavoriteNotices(req.user.id);
  }

  // Add notices to favorites
  @ApiOkResponse({ type: [Notice] })
  @Post('me/favorites/:id')
  async addToFavorites(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return await this.usersService.addToFavorites(req.user.id, id);
  }

  // Remove notices from favorites
  @ApiOkResponse({ type: [Notice] })
  @Delete('me/favorites/:id')
  async removeFromFavorites(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return await this.usersService.removeFromFavorites(req.user.id, id);
  }

  // Get user's pets
  @ApiOkResponse({ type: [Pet] })
  @Get('me/pets')
  async findUserPets(@Request() req: AuthenticatedRequest) {
    return await this.petsService.findPetsByUserId(req.user.id);
  }
}
