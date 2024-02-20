import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  // Request,
  // UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Notice } from 'src/notice/entities/notice.entity';
import { Pet } from 'src/pet/entities/pet.entity';

@ApiTags('Users') // Swagger tag for API
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get current user data
  @ApiOkResponse({ type: User })
  @Get('/me')
  async getUser() {
    // @Request() req: AuthenticatedRequest
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    return await this.userService.findById(userId); // req.user._id
  }

  // update user data
  @ApiOkResponse({
    type: User,
    description: 'User profile has been successfully updated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Put('/me')
  async updateUser(
    // @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    const user = await this.userService.update(updateUserDto, userId); //  req.user._id

    return {
      message: 'User profile has been successfully updated',
      data: user,
    };
  }

  // Delete user account
  @ApiOkResponse({ description: 'User profile has been successfully deleted' })
  // @UseInterceptors(DeleteUserDataInterceptor) // Apply the interceptor here
  @Delete('/me')
  async removeUser() {
    // @Request() req: AuthenticatedRequest
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    await this.userService.remove(userId); // req.user._id

    return {
      message: 'User profile has been successfully deleted',
    };
  }

  // Get user's own notices
  @ApiOkResponse({ type: [Notice] })
  @Get('/me/notices')
  async getUserNotices() {
    //@Request() req: AuthenticatedRequest
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    const notices = await this.userService.getUserNotices(userId); // req.user._id

    return {
      message: 'Success',
      data: notices,
    };
  }

  // Get user's favorite notices
  @ApiOkResponse({ type: [Notice] })
  @Get('/me/favorites')
  async getUserFavorites() {
    // @Request() req: AuthenticatedRequest
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    const favoriteNotices =
      await this.userService.getUserFavoriteNotices(userId); //     req.user._id,

    return {
      message: 'Success',
      data: favoriteNotices,
    };
  }

  // Add notices to favorites
  @ApiOkResponse({ type: [Notice] })
  @Post('/me/favorites/:id')
  async addToFavorites(
    // @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    const updatedNotices = await this.userService.addToFavorites(
      // req.user._id,
      userId,
      id,
    );

    return {
      message: `Notice ${id} added to favorites for user ${userId}`, // req.user._id
      data: updatedNotices,
    };
  }

  // Remove notices from favorites
  @ApiOkResponse({ type: [Notice] })
  @Delete('/me/favorites/:id')
  async removeFromFavorites(
    //   @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    const updatedNotices = await this.userService.removeFromFavorites(
      userId, //  req.user._id,
      id,
    );

    return {
      message: `Notice ${id} removed from favorites for user ${userId}`, // req.user._id
      data: updatedNotices,
    };
  }

  // Get user's favorite notices
  @ApiOkResponse({ type: [Pet] })
  @Get('/me/pets')
  async getUserPets() {
    // @Request() req: AuthenticatedRequest
    const userId = 'c7f32532-8096-4997-9755-dab3b80c43d0';
    const pets = await this.userService.getUserPets(userId); // req.user._id

    return {
      message: 'Success',
      data: pets,
    };
  }
}
