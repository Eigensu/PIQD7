import { AppService } from './app.service';

describe('AppService', () => {
  it('reports the service as healthy', () => {
    expect(new AppService().getHealth()).toEqual({
      status: 'ok',
      service: 'backend',
    });
  });
});
