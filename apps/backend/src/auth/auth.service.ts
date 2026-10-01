import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleProfile, UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.strategy';

export interface PublicUser {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  // Creates or updates the user for this Google profile and returns a JWT.
  async loginWithGoogle(profile: GoogleProfile): Promise<string> {
    const user = await this.users.upsertFromGoogle(profile);
    const payload: JwtPayload = { sub: user.id as string, email: user.email };
    return this.jwt.signAsync(payload);
  }

  async me(userId: string): Promise<PublicUser> {
    const user = await this.users.findById(userId);
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id as string,
      email: user.email,
      name: user.name,
      picture: user.picture,
    };
  }
}
