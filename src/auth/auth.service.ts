/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email); // Find use
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare password
    if (!isPasswordValid) return null;

    const { password: userPassword, ...result } = user.dataValues;
    return result;
  }

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: User }> {
    const newUser = await this.usersService.create(createUserDto);
    return {
      message: 'User has been successfully signed up',
      data: newUser,
    };
  }

  login(user: AuthenticatedUser) {
    const payload = { email: user.email, sub: user.id };

    const { password, id, email, isAdmin, fullName } = user;

    return {
      access_token: this.jwtService.sign(payload),
      data: { id, email, isAdmin, fullName },
    };
  }
}
