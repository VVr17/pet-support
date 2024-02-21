import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticesService } from './notices.service';
import { Notice } from './entities/notices.entity';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsMyNoticeGuard } from './guards/isMyNotice.guard';

@ApiTags('Notices') // Swagger tags for API
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @ApiCreatedResponse({
    description: 'The notice has been successfully created.',
    type: Notice,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async addNotice(
    @Body() createNoticeDto: CreateNoticeDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const notice = await this.noticesService.create(
      createNoticeDto,
      req.user.id,
    );
    return { message: 'New notice successfully created', data: notice };
  }

  @ApiOkResponse({ type: [Notice] })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getNotices(
    @Query('category') category: string = null,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const response = await this.noticesService.findAll(category, +page, +limit);

    return {
      message: 'Success',
      data: response,
      // total: response.total,
      // data: response.notices,
    };
  }

  @ApiOkResponse({
    description: 'The notice has been successfully found.',
    type: Notice,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Get(':id')
  async getNoticeById(@Param('id') id: string) {
    const notice = await this.noticesService.findOne(id);
    return { message: 'Success', data: notice };
  }

  @ApiOkResponse({
    description: 'The notice has been successfully updated.',
    type: Notice,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsMyNoticeGuard)
  @Put(':id')
  async updateNotice(
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    const updatedNotice = await this.noticesService.update(id, updateNoticeDto);
    return { message: 'Notice successfully updated', data: updatedNotice };
  }

  @ApiOkResponse({
    description: 'The notice has been successfully deleted.',
    type: Notice,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsMyNoticeGuard)
  @Delete(':id')
  async removeNotice(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    await this.noticesService.removeOne(id, req.user.id);
    return { message: `Notice ${id} has been deleted successfully` };
  }
}
