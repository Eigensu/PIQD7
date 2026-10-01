import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

const profile = {
  googleId: 'g-1',
  email: 'ana@example.com',
  name: 'Ana',
  picture: 'https://example.com/a.png',
};

describe('AuthService', () => {
  const users = {
    upsertFromGoogle: jest.fn(),
    findById: jest.fn(),
  };
  const jwt = new JwtService({ secret: 'test' });
  const service = new AuthService(users as unknown as UsersService, jwt);

  beforeEach(() => jest.resetAllMocks());

  it('upserts the Google profile and signs a JWT for the user', async () => {
    users.upsertFromGoogle.mockResolvedValue({
      id: 'u1',
      email: profile.email,
    });

    const token = await service.loginWithGoogle(profile);

    expect(users.upsertFromGoogle).toHaveBeenCalledWith(profile);
    expect(jwt.verify(token)).toMatchObject({
      sub: 'u1',
      email: profile.email,
    });
  });

  it('me() returns only the public fields', async () => {
    users.findById.mockResolvedValue({
      id: 'u1',
      googleId: 'g-1',
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });

    await expect(service.me('u1')).resolves.toEqual({
      id: 'u1',
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    });
  });

  it('me() is unauthorized when the user is gone', async () => {
    users.findById.mockResolvedValue(null);
    await expect(service.me('nope')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
