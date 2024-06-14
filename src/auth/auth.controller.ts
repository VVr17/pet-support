import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/users/entities/users.entity';
import { swaggerSignUpUserSchema } from './dto/sign-up-user-schema';

@ApiTags('Auth') // Swagger tag for API
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiBody(swaggerSignUpUserSchema)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody(swaggerSignUpUserSchema)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
