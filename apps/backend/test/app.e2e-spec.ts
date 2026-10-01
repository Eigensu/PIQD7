import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

// AppModule needs a live MongoDB, so the health check is exercised through
// just the controller and service. Auth is covered in auth.e2e-spec.ts.
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / returns the health payload', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ status: 'ok', service: 'backend' });
  });
});
