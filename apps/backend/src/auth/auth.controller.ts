import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import type { CookieOptions, Request, Response } from 'express';
import { GoogleProfile } from '../users/users.service';
import { AuthService } from './auth.service';
import { AUTH_COOKIE } from './jwt.strategy';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// If Google sign-in fails or is cancelled, send the browser back to the
// sign-in page instead of showing a raw JSON error.
@Catch(HttpException)
class GoogleCallbackFilter implements ExceptionFilter {
  constructor(private readonly config: ConfigService) {}

  catch(_exception: HttpException, host: ArgumentsHost) {
    const frontend = this.config.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );
    host
      .switchToHttp()
      .getResponse<Response>()
      .redirect(`${frontend}/signin?error=google`);
  }
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  private cookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.config.get('NODE_ENV') === 'production',
      path: '/',
    };
  }

  // Redirects to Google; the guard does the work.
  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {
    // Nothing to do: AuthGuard('google') redirects the browser to Google.
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @UseFilters(GoogleCallbackFilter)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.auth.loginWithGoogle(req.user as GoogleProfile);
    res.cookie(AUTH_COOKIE, token, {
      ...this.cookieOptions(),
      maxAge: WEEK_MS,
    });
    res.redirect(
      `${this.config.get<string>('FRONTEND_URL', 'http://localhost:3000')}/brands`,
    );
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: Request) {
    return this.auth.me((req.user as { id: string }).id);
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(AUTH_COOKIE, this.cookieOptions());
  }
}
