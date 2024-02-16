import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  async signup(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);

    return {
      message: 'User has been successfully signed up',
      data: createUserDto,
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
