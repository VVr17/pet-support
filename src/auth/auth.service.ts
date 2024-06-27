/* eslint-disable @typescript-eslint/no-unused-vars */
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email); // Find user
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

  async googleLogin(req) {
    if (!req?.user?.user) {
      return {
        access_token: null,
        message: 'No user from Google',
      };
    }

    // Get user data from Google
    const { email, firstName, lastName, picture } = req.user.user;

    // Check, whether there is a user by email
    let user = await this.usersService.findOne(email);

    // If user doesn't exist, create a new one
    if (!user) {
      const createUserDto: CreateUserDto = {
        email,
        password: process.env.GOOGLE_PASSWORD,
        isAdmin: false,
        fullName: firstName && lastName ? `${firstName} ${lastName}` : null,
        photoURL: picture ? picture : null,
      };

      user = await this.usersService.create(createUserDto);
    }

    const payload = { email: req.user.email, sub: req.user.id };
    return {
      data: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
