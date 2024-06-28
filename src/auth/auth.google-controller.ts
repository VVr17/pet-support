import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth2 login flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const access_token = await this.authService.googleLogin(req);

    // Redirect to front end login page, if there is no token
    if (!access_token) {
      res.redirect(`${process.env.BASE_FRONT_URL}/login`);
    }

    // Redirect to front end page is case of success auth, providing access_token
    res.redirect(
      `${process.env.BASE_FRONT_URL}/google-oauth-success-redirect/${access_token}`,
    );
  }
}
