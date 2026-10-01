import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { App } from 'supertest/types';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { UsersService } from '../src/users/users.service';

const SECRET = 'test-secret';
const user = {
  id: 'u1',
  email: 'ana@example.com',
  name: 'Ana',
  picture: 'https://example.com/a.png',
};

// The real Google round-trip needs a browser; here we cover everything after
// it: the JWT cookie/bearer guard, /auth/me and logout. No database needed.
describe('Auth (e2e)', () => {
  let app: INestApplication<App>;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [() => ({ JWT_SECRET: SECRET })],
        }),
        PassportModule,
        JwtModule.register({
          secret: SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: UsersService,
          useValue: {
            findById: (id: string) =>
              Promise.resolve(id === user.id ? user : null),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();
    jwt = moduleRef.get(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /auth/me without a token is 401', async () => {
    await request(app.getHttpServer()).get('/auth/me').expect(401);
  });

  it('GET /auth/me with a valid cookie returns the profile', async () => {
    const token = await jwt.signAsync({ sub: user.id, email: user.email });
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', `jl_token=${token}`)
      .expect(200)
      .expect(user);
  });

  it('GET /auth/me with a bearer token also works', async () => {
    const token = await jwt.signAsync({ sub: user.id, email: user.email });
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('GET /auth/me rejects a token signed with another secret', async () => {
    const forged = await new JwtService({ secret: 'other' }).signAsync({
      sub: user.id,
      email: user.email,
    });
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', `jl_token=${forged}`)
      .expect(401);
  });

  it('GET /auth/me rejects an expired token', async () => {
    const expired = await jwt.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '-10s' },
    );
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', `jl_token=${expired}`)
      .expect(401);
  });

  it('GET /auth/me is 401 when the user no longer exists', async () => {
    const token = await jwt.signAsync({ sub: 'gone', email: 'x@y.z' });
    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Cookie', `jl_token=${token}`)
      .expect(401);
  });

  it('POST /auth/logout clears the cookie', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/logout')
      .expect(204);
    const cookies = ([] as string[]).concat(res.headers['set-cookie'] ?? []);
    expect(cookies.join(';')).toMatch(/jl_token=;/);
  });
});
