import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    // private jwtService: JwtService,
  ) {}

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: User }> {
    const user = await this.usersService.create(createUserDto);

    return {
      message: 'User has been successfully signed up',
      data: user,
    };
  }

  async signin() {
    // const payload = { email: user.email, sub: user._id };
    // return this.jwtService.sign(payload);

    return { message: 'logged in' };
    // return {
    //   access_token: this.authService.login(req.user),
    //   data: req.user,
    // };
  }
}
