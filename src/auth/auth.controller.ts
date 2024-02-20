import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Auth') // Swagger tag for API
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'Password123',
        },
      },
      required: ['email', 'password'],
    },
  })
  // @UseGuards(LocalAuthGuard)
  //@Request() req: AuthenticatedRequest
  @Post('signin')
  async signin() {
    return await this.authService.signin();
  }
}
