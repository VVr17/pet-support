import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

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
    const auth = await this.authService.googleLogin(req);

    // `http://localhost:3000/google-oauth-success-redirect/${auth.access_token}/${auth.access_token}${req.params.from}`,
    Redirect(
      `http://localhost:5173/google-oauth-success-redirect/${auth.access_token}`,
    );
  }
}
