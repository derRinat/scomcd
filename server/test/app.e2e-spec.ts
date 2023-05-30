import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CalculateDto } from './../src/dto/calculate.dto';

const testDto: CalculateDto = {
  period: 10,
  repaymentRate: 3,
  interestRate: 2,
  amount: 250000
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/calculate (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/calculate')
      .send(testDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toHaveProperty('totals');
        expect(body).toHaveProperty('data');
      });
  });

  it('/calculate (POST) - failed', () => {
    return request(app.getHttpServer())
      .post('/calculate')
      .send({ ...testDto, repaymentRate: 15 })
      .expect(400, {
        statusCode: 400,
        message: ['repaymentRate must not be greater than 10'],
        error: 'Bad Request'
      });
  });

  it('/notfound (GET) - 404 error', () => {
    return request(app.getHttpServer()).get('/notfound').expect(404, {
      statusCode: 404,
      message: 'Cannot GET /notfound',
      error: 'Not Found'
    });
  });
});
