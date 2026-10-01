import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController.googleCallback', () => {
  const auth = { loginWithGoogle: jest.fn().mockResolvedValue('signed.jwt') };
  const config = new ConfigService({ FRONTEND_URL: 'http://localhost:3000' });
  const controller = new AuthController(auth as unknown as AuthService, config);

  it('sets an httpOnly cookie and redirects into the app', async () => {
    const res = { cookie: jest.fn(), redirect: jest.fn() };
    const profile = { googleId: 'g-1', email: 'ana@example.com' };

    await controller.googleCallback(
      { user: profile } as unknown as Request,
      res as unknown as Response,
    );

    expect(auth.loginWithGoogle).toHaveBeenCalledWith(profile);
    expect(res.cookie).toHaveBeenCalledWith(
      'jl_token',
      'signed.jwt',
      expect.objectContaining({ httpOnly: true, sameSite: 'lax', path: '/' }),
    );
    expect(res.redirect).toHaveBeenCalledWith('http://localhost:3000/brands');
  });
});
